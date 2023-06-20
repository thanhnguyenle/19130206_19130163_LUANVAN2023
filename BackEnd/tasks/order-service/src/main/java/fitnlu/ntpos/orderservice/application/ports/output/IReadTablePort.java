package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadTablePort {
     List<Table> findAllTable() ;
     List<Table> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue);
     List<Table> findAllTable(String sortType, String sortValue, String searchType, String searchValue) ;
     List<Table> findEmptyTableAtTime(long startTime, long endTime) ;
     List<Table> findEmptyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
     List<Table> findEmptyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
     List<Table> findBusyTableAtTime(long startTime, long endTime) ;
     List<Table> findBusyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
     List<Table> findBusyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
     Table findTableByID(String tableID) ;
     List<Table> findAllTableByOrderID(String orderID);
     List<Table> findAllTableByOrderID(IPaging paging, String orderID,String sortType, String sortValue, String searchType, String searchValue);
     List<Table> findAllTableByOrderID(String startTime, String orderID, String sortValue, String searchType, String searchValue);
      List<Table> findAllTableByGroupID(String groupID);
}
