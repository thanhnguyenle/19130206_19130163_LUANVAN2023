package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
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
public class TableRepository implements ITableDBIRepository {
    private static final String GET_LIST = "select * from `table`";
    private static final String CREATE = "INSERT INTO `table` VALUES (:id, :name,:numberOfPeople,:status,:note)";
    private static final String DELETE = "DELETE FROM `table` WHERE id = :id";
    private static final String GET_TABLE_BY_ID = "SELECT * FROM `table` WHERE id = :id";
    private static final String GET_TABLE_BY_GROUPID = "SELECT * FROM `table` WHERE id IN (SELECT tableID FROM `group_table` WHERE groupID = :groupID)";
    private static final String UPDATE = "UPDATE `table` SET name =:name, numberOfPeople =:numberOfPeople, status =:status, note =:note WHERE id =:id";
    private static final String GET_LIST_TABLE_FREE ="SELECT * FROM `table` WHERE id NOT IN (SELECT tableID FROM `order_table` WHERE :startTime BETWEEN startTime AND endTime OR :endTime BETWEEN startTime AND endTime)";
    private static final String GET_LIST_TABLE_BUSY = "SELECT * FROM `table` WHERE id IN (SELECT tableID FROM `order_table` WHERE :startTime BETWEEN startTime AND endTime OR :endTime BETWEEN startTime AND endTime)";
    private static final String DELETE_ALL_TABLE_BY_GROUPID = "DELETE FROM `group_table` WHERE groupID = :groupID";
    private static final String DELETE_ALL_TABLE_BY_ORDERID = "DELETE FROM `order_table` WHERE orderID = :orderID";
    private static final String GET_LIST_TABLE_BY_ORDERID = "SELECT * FROM `table` WHERE id IN (SELECT tableID FROM `order_table` WHERE orderID = :orderID)";
    @NonNull
    private final Jdbi jdbi;

    @Override
    public TableEntities createTable(TableEntities table) {
       String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id", id)
                    .bind("name", table.getName())
                    .bind("numberOfPeople", table.getNumberOfPeople())
                    .bind("status", table.getStatus())
                    .bind("note", table.getNote())
                    .execute();
            table.setId(id);
            return table;
        });
    }

    @Override
    public TableEntities deleteTable(String id) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE)
                    .bind("id", id)
                    .execute();
            return TableEntities.builder().id(id).build();
        });
    }

    @Override
    public TableEntities updateTable(String id, TableEntities table) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id", id)
                    .bind("name", table.getName())
                    .bind("numberOfPeople", table.getNumberOfPeople())
                    .bind("status", table.getStatus())
                    .bind("note", table.getNote())
                    .execute();
            table.setId(id);
            return table;
        });
    }

    @Override
    public boolean deleteAllTableByGroupID(String groupID) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE_ALL_TABLE_BY_GROUPID)
                 .bind("groupID", groupID)
                 .execute()>0);
    }

    @Override
    public List<TableEntities> findAllTable() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST).mapToBean(TableEntities.class).list());
    }

    @Override
    public List<TableEntities> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue) {
        List<TableEntities> list = findAllTable( sortType, sortValue, searchType, searchValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<TableEntities> findAllTable(String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            sql.append(" WHERE LOWER(").append(searchType).append(")")
                    .append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(TableEntities.class)
                .list());
    }

    @Override
    public List<TableEntities> findEmptyTableAtTime(long startTime, long endTime) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_TABLE_FREE)
                .bind("startTime", startTime)
                .bind("endTime", endTime)
                .mapToBean(TableEntities.class)
                .list());
    }

    @Override
    public List<TableEntities> findEmptyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        List<TableEntities> list = findEmptyTableAtTime(startTime,endTime,sortType, sortValue, searchType, searchValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<TableEntities> findEmptyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        boolean haveSearch = false;
        if((searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()) || (startTime>0 && endTime>0)){
            sql.append(" WHERE ");
        }
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            sql.append(" LOWER(").append(searchType).append(")")
                    .append(" LIKE '%").append(searchValue).append("%'");
            haveSearch = true;
        }
        if(startTime>0 && endTime>0){
            if(haveSearch){
                sql.append(" AND ");
            }
            sql.append(" id NOT IN (SELECT tableID FROM `order_table` WHERE ").append(startTime).append(" BETWEEN startTime AND endTime OR ").append(endTime).append(" BETWEEN startTime AND endTime) ");
        }
        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }

        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(TableEntities.class)
                .list());
    }

    @Override
    public List<TableEntities> findBusyTableAtTime(long startTime, long endTime) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_TABLE_BUSY)
                .bind("startTime", startTime)
                .bind("endTime", endTime)
                .mapToBean(TableEntities.class)
                .list());
    }

    @Override
    public List<TableEntities> findBusyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        List<TableEntities> list = findBusyTableAtTime(startTime,endTime,sortType, sortValue, searchType, searchValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<TableEntities> findBusyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        boolean haveSearch = false;
        if((searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()) || (startTime>0 && endTime>0)){
            sql.append(" WHERE ");
        }
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            sql.append(" LOWER(").append(searchType).append(")")
                    .append(" LIKE '%").append(searchValue).append("%'");
            haveSearch = true;
        }
        if(startTime>0 && endTime>0){
            if(haveSearch){
                sql.append(" AND ");
            }
            sql.append(" id IN (SELECT tableID FROM `order_table` WHERE ").append(startTime).append(" BETWEEN startTime AND endTime OR ").append(endTime).append(" BETWEEN startTime AND endTime) ");
        }
        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(TableEntities.class)
                .list());
    }

    @Override
    public TableEntities findTableByID(String tableID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_TABLE_BY_ID)
                .bind("id", tableID)
                .mapToBean(TableEntities.class).one());
    }

    @Override
    public boolean deleteAllTableFromOrder(String orderID) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE_ALL_TABLE_BY_ORDERID)
                .bind("orderID", orderID)
                .execute() > 0);
    }

    @Override
    public List<TableEntities> findAllTableByOrderID(String orderID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_TABLE_BY_ORDERID)
                .bind("orderID", orderID)
                .mapToBean(TableEntities.class).list());
    }

    @Override
    public List<TableEntities> findAllTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        List<TableEntities> list = findAllTableByOrderID(orderID,sortType, sortValue, searchType, searchValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<TableEntities> findAllTableByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        boolean haveOrderID = false;
        if((searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()) || (orderID!=null && !orderID.isEmpty())){
            sql.append(" WHERE ");
        }
        if(orderID!=null && !orderID.isEmpty()){
            sql.append(" orderID = '").append(orderID).append("'");
            haveOrderID = true;
        }
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            if(haveOrderID){
                sql.append(" AND ");
            }
            sql.append(" LOWER(").append(searchType).append(")")
                    .append(" LIKE '%").append(searchValue).append("%'");
        }

        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }

        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(TableEntities.class)
                .list());
    }

    @Override
    public List<TableEntities> findTableByGroupID(String groupID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_TABLE_BY_GROUPID)
                .bind("groupID", groupID)
                .mapToBean(TableEntities.class).list());
    }

}
