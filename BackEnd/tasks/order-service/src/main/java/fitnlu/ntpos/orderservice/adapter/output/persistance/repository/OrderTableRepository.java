package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class OrderTableRepository implements IOrderTableDBIRepository {
    private static final String GET_LIST = "select * from `order_table`";
    private static final String GET_LIST_BYID = "select * from `order_table` where orderID=:orderID AND tableID=:tableID";
   private static final String UPDATE = "UPDATE `order_table` SET status =:status, note=:note, startTime=:startTime, endTime=:endTime WHERE orderID=:orderID AND tableID=:tableID";

     @NonNull
    private final Jdbi jdbi;


    @Override
    public OrderTableEntities updateOrderTable(String orderID, String tableID, OrderTableEntities orderTableEntities) {
        jdbi.useHandle(handle -> handle.createUpdate(UPDATE)
                .bind("orderID", orderID)
                .bind("tableID", tableID)
                .bind("status", orderTableEntities.getStatus())
                .bind("note", orderTableEntities.getNote())
                .bind("startTime", orderTableEntities.getStartTime())
                .bind("endTime", orderTableEntities.getEndTime())
                .execute());
        return orderTableEntities;
    }

    @Override
    public List<OrderTableEntities> findAllOrderTable() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(OrderTableEntities.class).list());
    }

    @Override
    public OrderTableEntities findOrderTableByID(String orderID, String tableID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_BYID)
                .bind("orderID", orderID)
                .bind("tableID", tableID)
                .mapToBean(OrderTableEntities.class).one());
    }

    @Override
    public List<OrderTableEntities> findAllOrderTableByOrderID(String orderID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST + " WHERE orderID = :orderID")
                .bind("orderID", orderID)
                .mapToBean(OrderTableEntities.class).list());
    }

    @Override
    public List<OrderTableEntities> findAllOrderTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        List<OrderTableEntities> orderTableEntities = findAllOrderTableByOrderID(orderID, sortType, sortValue, searchType, searchValue);
        if(paging!=null){
            return orderTableEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
        }
        return orderTableEntities;
    }

    @Override
    public List<OrderTableEntities> findAllOrderTableByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        boolean haveOrderID = false;
        if (orderID != null && !orderID.isEmpty()) {
            sql.append(" WHERE orderID = :orderID");
            haveOrderID = true;
        }
        if (searchType != null && !searchType.isEmpty() && searchValue != null && !searchValue.isEmpty()) {
            if (haveOrderID) {
                sql.append(" AND ").append(searchType).append(" LIKE '%").append(searchValue).append("%'");
            } else {
                sql.append(" WHERE ").append(searchType).append(" LIKE '%").append(searchValue).append("%'");
            }
        }
        if (sortType != null && !sortType.isEmpty() && sortValue != null && !sortValue.isEmpty()) {
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }

        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .bind("orderID", orderID)
                .mapToBean(OrderTableEntities.class).list());
    }
}
