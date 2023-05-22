package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadTablePort {
     List<Table> findAllTable() ;
     List<Table> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue);
     List<Table> findAllTable(String sortType, String sortValue, String searchType, String searchValue) ;
     List<Table> findEmptyTableAtTime(String startTime, String endTime) ;
     List<Table> findEmptyTableAtTime(IPaging paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
     List<Table> findEmptyTableAtTime(String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
     Table findTableByID(String tableID) ;
}
