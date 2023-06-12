package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;


import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IGroupTableDBIRepository {
    TableEntities createTable(TableEntities table);
    TableEntities deleteTable(String id);
    TableEntities updateTable(TableEntities table);
    List<TableEntities> findAllTable() ;
    List<TableEntities> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findAllTable(String sortType, String sortValue, String searchType, String searchValue) ;
    List<TableEntities> findEmptyTableAtTime(String startTime, String endTime) ;
    List<TableEntities> findEmptyTableAtTime(IPaging paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findEmptyTableAtTime(String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findBusyTableAtTime(String startTime, String endTime) ;
    List<TableEntities> findBusyTableAtTime(IPaging paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
    List<TableEntities> findBusyTableAtTime(String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
    TableEntities findTableByID(String tableID) ;
    List<TableEntities> findTableByGroupID(String groupID