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
public class OrderLineItemRepository implements IOrderLineItemDBIRepository {
    private static final String GET_LIST = "select * from `order_product`";

    private static final String GET_LIST_BY_ORDERID = "select * from `order_product` where orderID = :orderID";

    private static final String GET_ITEM_BYID = "select * from `order_product` where id = :id";

    private static final String UPDATE = "UPDATE `order_product` SET quantity =:quantity, discount=:discount,price=:price WHERE orderID =:orderID AND productID =:productID";
    private static final String DELETE_ALL_ORDERLINEITEM_BY_ORDER = "DELETE FROM `order_product` WHERE orderID =:orderID";
    @NonNull
    private final Jdbi jdbi;

    @Override
    public OrderProductEntities updateOrderLineItem(String orderID, String productID,  OrderProductEntities orderProductEntities) {
         jdbi.withHandle(handle -> handle.createUpdate(UPDATE)
                .bind("orderID",orderID)
                .bind("productID",productID)
                .bind("quantity",orderProductEntities.getQuantity())
                .bind("discount",orderProductEntities.getDiscount())
                .bind("price",orderProductEntities.getPrice())
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
}
