package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindTableAtTimeUseCase {
    List<Table> findAllTable();
    List<Table> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue);
    List<Table> findAllTable(String sortType, String sortValue, String searchType, String searchValue);

}
