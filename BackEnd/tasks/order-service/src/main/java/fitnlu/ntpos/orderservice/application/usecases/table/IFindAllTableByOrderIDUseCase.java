package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllTableByOrderIDUseCase {
    List<Table> findAllTableByOrderID(String orderID);
    List<Table> findAllTableByOrderID(IPaging paging, String orderID,String sortType, String sortValue, String searchType, String searchValue);
    List<Table> findAllTableByOrderID(String orderID,String sortType, String sortValue, String searchType, String searchValue);

}
