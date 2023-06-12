package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllTableByOrderIDUseCase {
    List<Table> findBusyTableAtTime(String startTime, String endTime);
    List<Table> findBusyTableAtTime(IPaging paging, String startTime, String endTime,String sortType, String sortValue, String searchType, String searchValue);
    List<Table> findBusyTableAtTime(String startTime, String endTime,String sortType, String sortValue, String searchType, String searchValue);

}
