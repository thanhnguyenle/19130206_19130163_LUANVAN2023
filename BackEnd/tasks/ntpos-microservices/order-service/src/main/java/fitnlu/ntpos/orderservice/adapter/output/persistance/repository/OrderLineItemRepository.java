package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.grpcproto.TimeSearch;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.domain.model.DateTime;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.Builder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.jdbi.v3.core.statement.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class OrderLineItemRepository implements IOrderLineItemDBIRepository {
    private static final String GET_LIST = "select * from `order_product`";

    private static final String GET_LIST_BY_ORDERID = "select * from `order_product` where orderID = :orderID";

    private static final String GET_ITEM_BYID = "select * from `order_product` where id = :id";
    private static final String GET_LIST_BY_PRODUCTID = "select * from `order_product` where productID = :productID AND orderID IN (SELECT id FROM `order` WHERE status = 'PAYMENT')";
    private static final String UPDATE = "UPDATE `order_product` SET quantity =:quantity, discount=:discount, price=:price, name=:name WHERE orderID =:orderID AND productID =:productID";
    private static final String DELETE_ALL_ORDERLINEITEM_BY_ORDER = "DELETE FROM `order_product` WHERE orderID =:orderID";
    private static final String GET_LIST_BY_PRODUCTID_RAW = "select * from `order_product` where productID = :productID";

    private static final String COUNT_ORDERLINEITEM_COMPLETE = "select SUM(quantity) from `order_product` where orderID IN (SELECT id FROM `order` WHERE status = 'PAYMENT')";

    private static final String COUNT_ORDERLINEITEM_COMPLETE_RAW = "select SUM(quantity) from `order_product`";
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
        }else if(timeSearch ==TimeSearch.THIS_WEEK){
            startTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.LAST_WEEK){
            startTime = dateTime.getEndWeek();
            endTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.THIS_MONTH) {
            startTime = dateTime.getStartMonth();
        }else if (timeSearch ==TimeSearch.LAST_MONTH) {
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
    public OrderProductEntities updateOrderLineItem(String orderID, String productID,  OrderProductEntities orderProductEntities) {
         jdbi.withHandle(handle -> handle.createUpdate(UPDATE)
                .bind("orderID",orderID)
                .bind("productID",productID)
                .bind("quantity",orderProductEntities.getQuantity())
                .bind("discount",orderProductEntities.getDiscount())
                .bind("price",orderProductEntities.getPrice())
                 .bind("name",orderProductEntities.getName())
                 .execute());
        return orderProductEntities;
    }

    @Override
    public List<OrderProductEntities> findAllOrderLineItemByOrderID(String orderID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_BY_ORDERID)
                .bind("orderID", orderID)
                .mapToBean(OrderProductEntities.class)
                .list());
    }

    @Override
    public List<OrderProductEntities> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        List<OrderProductEntities> list = filterAllOrderLineItemByOrderID(orderID, sortType, sortValue, searchType, searchValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<OrderProductEntities> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        boolean haveOrderID = false;
        if((orderID!=null && !orderID.isEmpty()) || (searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty())){
            sql.append(" WHERE ");
        }
        if(orderID!=null && !orderID.isEmpty()){
            sql.append(" orderID = '").append(orderID).append("'");
            haveOrderID = true;
        }
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            if (haveOrderID)
                sql.append(" AND LOWER(").append(searchType).append(")")
                        .append(" LIKE '%").append(searchValue).append("%'");
            else
                sql.append(" LOWER(").append(searchType).append(")")
                        .append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(OrderProductEntities.class)
                .list());
    }

    @Override
    public OrderProductEntities findOrderLineItemByID(String id) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", id)
                .mapToBean(OrderProductEntities.class)
                .one());
    }

    @Override
    public boolean deleteAllOrderLineItemsFromOrder(String orderID) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE_ALL_ORDERLINEITEM_BY_ORDER)
                .bind("orderID",orderID)
                .execute())>0;
    }

    @Override
    public List<OrderProductEntities> findAllOrderLineItemByProductID(String productID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_BY_PRODUCTID)
                .bind("productID", productID)
                .mapToBean(OrderProductEntities.class)
                .list());
    }

    @Override
    public List<OrderProductEntities> findAllOrderLineItemByProductID(String productID, TimeSearch timeSearch) {
        StringBuilder sql = new StringBuilder(GET_LIST_BY_PRODUCTID_RAW);
        if(timeSearch!=null){
            sql.append(" AND orderID IN (SELECT id FROM `order` WHERE status = 'PAYMENT'");
            OrderRepository.TimeSearchCompute timeSearchCompute = getTimeSearchCompute(timeSearch);
            sql.append(" AND orderDate BETWEEN ").append(timeSearchCompute.startTime)
                    .append(" AND ").append(timeSearchCompute.endTime)
                    .append(");");
        }else{
            sql.append(" AND orderID IN (SELECT id FROM `order` WHERE status = 'PAYMENT');");
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .bind("productID", productID)
                .mapToBean(OrderProductEntities.class)
                .list());
    }

    @Override
    public int numberOfOrderProductComplete() {
        return  jdbi.withHandle(handle -> handle.createQuery(COUNT_ORDERLINEITEM_COMPLETE)
                .mapTo(Integer.class)
                .one());
    }

    @Override
    public int numberOfOrderProductComplete(TimeSearch timeSearch) {
        try {
            StringBuilder sql = new StringBuilder(COUNT_ORDERLINEITEM_COMPLETE_RAW);
            if(timeSearch!=null){
                sql.append(" WHERE orderID IN (SELECT id FROM `order` WHERE status = 'PAYMENT'");
                OrderRepository.TimeSearchCompute timeSearchCompute = getTimeSearchCompute(timeSearch);
                sql.append(" AND orderDate BETWEEN ").append(timeSearchCompute.startTime)
                        .append(" AND ").append(timeSearchCompute.endTime)
                        .append(");");
            }else{
                sql.append(" WHERE orderID IN (SELECT id FROM `order` WHERE status = 'PAYMENT');");
            }
            return jdbi.withHandle(handle -> {
                Query query = handle.createQuery(sql.toString());
                if(query==null) return 0;
                else return query.mapTo(Integer.class).one();
            });
        }catch (Exception e){
            System.out.println(e.getMessage());
            return 0;
        }

    }
}
