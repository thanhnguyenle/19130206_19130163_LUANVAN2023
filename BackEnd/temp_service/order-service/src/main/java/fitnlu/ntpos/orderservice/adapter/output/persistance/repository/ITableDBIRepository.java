package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;


import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface ITableDBIRepository {
    TableEntities createTable(TableEntities table);
    TableEntities deleteTable(String id);
    TableEntities updateTable(String id, TableEntities table);
    boolean deleteAllTableByGroupID(String groupID);
    List<TableEntities> findAllTable() ;
    List<TableEntities> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findAllTable(String sortType, String sortValue, String searchType, String searchValue) ;
    List<TableEntities> findEmptyTableAtTime(long startTime, long endTime) ;
    List<TableEntities> findEmptyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findEmptyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findBusyTableAtTime(long startTime, long endTime) ;
    List<TableEntities> findBusyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findBusyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
    TableEntities findTableByID(String tableID) ;
    boolean deleteAllTableFromOrder(String orderID);
    List<TableEntities> findTableByGroupID(String groupID);
    List<TableEntities> findAllTableByOrderID(String orderID);
    List<TableEntities> findAllTableByOrderID(IPaging paging, String orderID,String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findAllTableByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findAllBusyTable();
    List<TableEntities> findAllEmptyTable();
}
