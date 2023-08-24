package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.*;
import fitnlu.ntpos.orderservice.domain.model.DateTime;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.Builder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class ReturnOrderRepository implements IReturnOrderDBIRepository {
    private static final String GET_LIST = "select * from `orderReturn`";
    private static final String CREATE = "INSERT INTO `orderReturn` VALUES (:id, :userID, :group,:orderID, :orderReturnDate,:status,:note)";
    private static final String DELETE = "DELETE FROM `orderReturn` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `orderReturn` WHERE id = :id";
    private static final String GET_ITEM_BY_USERID = "SELECT * FROM `orderReturn` WHERE userID = :userID";
    private static final String UPDATE = "UPDATE `orderReturn` SET userID=:userID, `group`=:group,orderID=:orderID, status=:status, note=:note WHERE id=:id";
    private static final String TOTAL_ITEM = "SELECT COUNT(*) FROM `orderReturn`";

    private static final String ADD_ORDERITEM_TO_ORDER = "INSERT INTO `orderReturn_product` VALUES (:orderReturnID,:productID,:quantity,:price,:discount, :name)";
    private static final String ADD_TABLE_TO_ORDER = "INSERT INTO `orderReturn_table` VALUES (:orderReturnID,:tableReturnID,:note,:startTime,:endTime, :name)";
    private static final String DELETE_ORDERITEM_FROM_ORDER = "DELETE FROM `orderReturn_product` WHERE orderID = :orderID AND productID = :productID";
    private static final String DELETE_TABLE_FROM_ORDER = "DELETE FROM `orderReturn_table` WHERE orderID = :orderID AND tableID = :tableID";
    private static final String DELETE_ALL_TABLE_FROM_ORDER = "DELETE FROM `orderReturn_table` WHERE orderReturnID = :orderReturnID";
    private static final String DELETE_ALL_ORDERITEM_FROM_ORDER = "DELETE FROM `orderReturn_product` WHERE orderReturnID = :orderReturnID";
    private static final String GET_ORDERITEM_BY_ORDERRETURNID = "select * from `orderReturn_product` where orderReturnID = :orderReturnID";
    private static final String GET_ORDERTABLE_BY_ORDERRETURNID = "select * from `orderReturn_table` where orderReturnID = :orderReturnID";
    private static final String GET_ORDERRETURN_BY_ORDERID = "select * from `orderReturn` where orderID = :orderID";
    private static final String GET_ORDERRETURN_BY_USERID = "select * from `orderReturn` where userID = :userID";
    @NonNull
    private final Jdbi jdbi;
    @Builder
    static
    class TimeSearchCompute {
        long startTime;
        long endTime;
    }
    public OrderRepository.TimeSearchCompute getTimeSearchCompute(TimeSearch timeSearch) {
        DateTime dateTime = DateTime.builder().build();
        long currentTime = System.currentTimeMillis();
        dateTime.updateTime(currentTime);
        long startTime = currentTime;
        long endTime = currentTime;
        if(timeSearch == TimeSearch.ALL_TIME) {
            startTime = 0;
        }else if(timeSearch == TimeSearch.TODAY){
            startTime = (currentTime / 86400000) * 86400000;
        }else if(timeSearch == TimeSearch.YESTERDAY){
            startTime = (currentTime / 86400000) * 86400000 - 86400*1000;
            endTime = (currentTime / 86400000) * 86400000;
        }else if(timeSearch == TimeSearch.THIS_WEEK){
            startTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.LAST_WEEK){
            startTime = dateTime.getEndWeek();
            endTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.THIS_MONTH) {
            startTime = dateTime.getStartMonth();
        }else if (timeSearch == TimeSearch.LAST_MONTH) {
            startTime = dateTime.getEndMonth();
            endTime = dateTime.getStartMonth();
        }else if (timeSearch == TimeSearch.THIS_YEAR) {
            startTime = dateTime.getStartYear();
        }else if (timeSearch == TimeSearch.LAST_YEAR) {
            startTime = dateTime.getEndYear();
            endTime = dateTime.getStartYear();
        }
        long finalStartTime = startTime/1000;
        long finalEndTime = endTime/1000;
        return OrderRepository.TimeSearchCompute.builder()
                .startTime(finalStartTime)
                .endTime(finalEndTime)
                .build();
    }
    @Override
    public List<OrderReturnEntities> findAllOrderReturn() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST).mapToBean(OrderReturnEntities.class).list());
    }

    @Override
    public List<OrderReturnEntities> findAllOrderReturn(IPaging paging,TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        List<OrderReturnEntities> list = findAllOrderReturn(timeSearch,sortType, sortValue, searchType, searchValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<OrderReturnEntities> findAllOrderReturn(TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        boolean haveSearch = false;
        if (searchType != null && !searchType.isEmpty() && searchValue != null) {
            haveSearch = true;
            sql.append(" WHERE ").append(searchType).append(" LIKE '%").append(searchValue).append("%'");
        }
        if(timeSearch!=null){
            if(haveSearch){
                sql.append(" AND");
            }else {
                sql.append(" WHERE");
            }
            OrderRepository.TimeSearchCompute timeSearchCompute = getTimeSearchCompute(timeSearch);
            sql.append(" orderReturnDate BETWEEN ").append(timeSearchCompute.startTime)
                    .append(" AND ").append(timeSearchCompute.endTime);
        }
        if (sortType != null && !sortType.isEmpty() && sortValue != null) {
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString()).mapToBean(OrderReturnEntities.class).list());
    }

    @Override
    public OrderReturnEntities findOrderReturn(String id) {
        OrderReturnEntities orderReturnEntities = jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", id)
                .mapToBean(OrderReturnEntities.class)
                .one());
        return orderReturnEntities;
    }

    @Override
    public OrderReturnEntities createOrderReturn(OrderReturn orderReturn) {
        String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id",id)
                    .bind("userID", orderReturn.getUserID())
                    .bind("group", orderReturn.getGroup())
                    .bind("orderID", orderReturn.getOrderID())
                    .bind("orderReturnDate", System.currentTimeMillis()/1000)
                    .bind("status", orderReturn.getStatus())
                    .bind("note", orderReturn.getNote())
                    .execute();
            return OrderReturnEntities.builder()
                    .id(id)
                    .build();
        });
    }

    @Override
    public OrderReturnEntities deleteOrderReturn(String id) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE).bind("id", id).execute();
            return OrderReturnEntities.builder().id(id).build();
        });
    }

    @Override
    public OrderReturnEntities updateOrderReturn(String id, OrderReturn orderReturn) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id", id)
                    .bind("userID", orderReturn.getUserID())
                    .bind("group", orderReturn.getGroup())
                    .bind("orderID", orderReturn.getOrderID())
                    .bind("status", orderReturn.getStatus())
                    .bind("note", orderReturn.getNote())
                    .execute();
            return OrderReturnEntities.builder()
                    .id(id)
                    .build();
        });
    }

    @Override
    public boolean addOrderLineItemToReturnOrder(String orderID, List<OrderProductEntities> orderProductEntities) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(ADD_ORDERITEM_TO_ORDER);
            orderProductEntities.forEach(orderProduct -> {
                preparedBatch.bind("orderReturnID", orderID)
                        .bind("productID", orderProduct.getProductID())
                        .bind("quantity", orderProduct.getQuantity())
                        .bind("price", orderProduct.getPrice())
                        .bind("discount", orderProduct.getDiscount())
                        .bind("name", orderProduct.getName())
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean addTableToReturnOrder(String orderID, List<OrderTableEntities> orderTableEntities) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(ADD_TABLE_TO_ORDER);
            orderTableEntities.forEach(orderTable -> {
                preparedBatch.bind("orderReturnID", orderID)
                        .bind("tableReturnID", orderTable.getTableID())
                        .bind("note", orderTable.getNote())
                        .bind("startTime", orderTable.getStartTime())
                        .bind("endTime", orderTable.getEndTime())
                        .bind("name", orderTable.getName())
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteAllOrderItemFromReturnOrder(String orderItemID) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE_ALL_ORDERITEM_FROM_ORDER).bind("orderReturnID", orderItemID).execute();
            return true;
        });
    }

    @Override
    public boolean deleteAllTableFromReturnOrder(String tableID) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE_ALL_TABLE_FROM_ORDER).bind("orderReturnID", tableID).execute();
            return true;
        });
    }

    @Override
    public List<OrderReturnTableEntities> findAllOrderTableByReturnOrderID(String returnOrderID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ORDERTABLE_BY_ORDERRETURNID)
                .bind("orderReturnID", returnOrderID)
                .mapToBean(OrderReturnTableEntities.class)
                .list());
    }

    @Override
    public List<OrderReturnProductEntities> findAllOrderLineItemByReturnOrderID(String returnOrderID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ORDERITEM_BY_ORDERRETURNID)
                .bind("orderReturnID", returnOrderID)
                .mapToBean(OrderReturnProductEntities.class)
                .list());
    }

    @Override
    public List<OrderReturnEntities> findAllOrderReturnByOrderID(String orderID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ORDERRETURN_BY_ORDERID)
                .bind("orderID", orderID)
                .mapToBean(OrderReturnEntities.class)
                .list());
    }

    @Override
    public List<OrderReturnEntities> findAllOrderReturnByUserID(String userID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ORDERRETURN_BY_USERID)
                .bind("userID", userID)
                .mapToBean(OrderReturnEntities.class)
                .list());
    }
}
