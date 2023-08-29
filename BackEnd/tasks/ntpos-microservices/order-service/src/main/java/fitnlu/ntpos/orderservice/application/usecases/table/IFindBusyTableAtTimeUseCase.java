package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindBusyTableAtTimeUseCase {
    List<Table> findBusyTableAtTime(long startTime, long endTime);
    List<Table> findBusyTableAtTime(IPaging paging, long startTime, long endTime,String sortType, String sortValue, String searchType, String searchValue);
    List<Table> findBusyTableAtTime(long startTime, long endTime,String sortType, String sortValue, String searchType, String searchValue);

}
