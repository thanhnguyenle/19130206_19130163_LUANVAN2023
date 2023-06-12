package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindBusyTableAtTimeUseCase {
    List<Table> findEmptyTableAtTime(String startTime, String endTime);
    List<Table> findEmptyTableAtTime(IPaging paging, String startTime, String endTime,String sortType, String sortValue, String searchType, String searchValue);
    List<Table> findEmptyTableAtTime(String startTime, String endTime,String sortType, String sortValue, String searchType, String searchValue);

}
