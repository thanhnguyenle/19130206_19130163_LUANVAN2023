package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.domain.model.DateTime;
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
public class OrderLineItemRepository implements IOrderDBIRepository {
    private static final String GET_LIST = "select * from `order`";
    private static final String CREATE = "INSERT INTO `order` VALUES (:id, :userID,:group,:status,:unit)";
    private static final String DELETE = "DELETE FROM `order` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `order` WHERE id = :id";
    private static final String GET_ITEM_BY_USERID = "SELECT * FROM `order` WHERE userID = :userID";
    private static final String UPDATE = "UPDATE `order` SET userID =:userID, group =:group, status =:status, unit =:unit WHERE id =:id";
    private static final String TOTAL_ITEM = "SELECT COUNT(*) FROM `order`";

    private static final String ADD_ORDERITEM_TO_ORDER = "INSERT INTO `order_product` VALUES (:orderID,:productID,:quantity,:price,:discount)";
    private static final String ADD_TABLE_TO_ORDER = "INSERT INTO `order_table` VALUES (:orderID,:tableID,:note,:status,:startTime,:endTime)";
    private static final String DELETE_ORDERITEM_FROM_ORDER = "DELETE FROM `order_product` WHERE orderID = :orderID AND productID = :productID";
    private static final String DELETE_TABLE_FROM_ORDER = "DELETE FROM `order_table` WHERE orderID = :orderID AND tableID = :tableID";

    @NonNull
    private final Jdbi jdbi;

    @Builder
    static
    class TimeSearchCompute {
         long startTime;
         long endTime;
    }
    public TimeSearchCompute getTimeSearchCompute(TimeSearch timeSearch) {
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
        return TimeSearchCompute.builder()
                .startTime(finalStartTime)
                .endTime(finalEndTime)
                .build();
    }

    @Override
    public List<OrderEntities> findAllOrderByUserID(String userID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BY_USERID)
                .bind("userID", userID)
                .mapToBean(OrderEntities.class)
                .list());
    }

    @Override
    public List<OrderEntities> filterOrder(IPaging paging, String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        List<OrderEntities> list = filterOrder(userID, timeSearch, sortType, sortValue, searchType, searchValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<OrderEntities> filterOrder(String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        if(userID!=null && !userID.isEmpty()){
            sql.append(" WHERE userID = '").append(userID).append("'");
        }
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            sql.append(" WHERE LOWER(").append(searchType).append(")")
                    .append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        if(timeSearch!=null){
            TimeSearchCompute timeSearchCompute = getTimeSearchCompute(timeSearch);
            sql.append(" AND createdTime BETWEEN ").append(timeSearchCompute.startTime)
                    .append(" AND ").append(timeSearchCompute.endTime);
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(OrderEntities.class)
                .list());
    }

    @Override
    public List<OrderEntities> findAllOrder() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(OrderEntities.class)
                .list());
    }

    @Override
    public OrderEntities findOrderByID(String orderID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", orderID)
                .mapToBean(OrderEntities.class)
                .findFirst()
                .orElse(null));
    }

    @Override
    public OrderEntities createOrder(OrderEntities orderEntities) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id", UUID.randomUUID().toString())
                    .bind("userID", orderEntities.getUserID())
                    .bind("group", orderEntities.getGroup())
                    .bind("status", orderEntities.getStatus())
                    .bind("numberOfPeople", orderEntities.getNumberOfPeople())
                    .bind("note", orderEntities.getNote())
                    .bind("orderDate", orderEntities.getOrderDate())
                    .execute();
            return orderEntities;
        });
    }

    @Override
    public OrderEntities deleteOrder(String orderID) {
        return jdbi.withHandle(handle -> handle.createQuery(DELETE)
                .bind("id", orderID)
                .mapToBean(OrderEntities.class)
                .findFirst()
                .orElse(null));
    }

    @Override
    public OrderEntities updateOrder(String orderID, OrderEntities orderEntities) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id", orderID)
                    .bind("userID", orderEntities.getUserID())
                    .bind("group", orderEntities.getGroup())
                    .bind("status", orderEntities.getStatus())
                    .bind("numberOfPeople", orderEntities.getNumberOfPeople())
                    .bind("note", orderEntities.getNote())
                    .bind("orderDate", orderEntities.getOrderDate())
                    .execute();
            return orderEntities;
        });
    }

    @Override
    public boolean addOrderLineItemFromOrder(String orderID, List<OrderProductEntities> orderProductEntities) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(ADD_ORDERITEM_TO_ORDER);
            orderProductEntities.forEach(orderProducts -> preparedBatch
                    .bind("orderID",orderProducts.getOrderID())
                    .bind("productID",orderProducts.getProductID())
                    .bind("quantity",orderProducts.getQuantity())
                    .bind("price",orderProducts.getPrice())
                    .bind("discount",orderProducts.getDiscount())
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean addTableToOrder(String orderID, List<OrderTableEntities> tableIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(ADD_TABLE_TO_ORDER);
            tableIDs.forEach(orderTable -> preparedBatch
                    .bind("orderID",orderTable.getOrderID())
                    .bind("tableID",orderTable.getTableID())
                    .bind("note",orderTable.getNote())
                    .bind("status",orderTable.getStatus())
                    .bind("startTime",orderTable.getStartTime())
                    .bind("endTime",orderTable.getEndTime())
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE_ORDERITEM_FROM_ORDER);
            orderLineItemIDs.forEach(orderLineItemID -> preparedBatch
                    .bind("id",orderLineItemID)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteTableToOrder(String orderID, List<String> tableIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE_TABLE_FROM_ORDER);
            tableIDs.forEach(tableID -> preparedBatch
                    .bind("id",tableID)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }
}
