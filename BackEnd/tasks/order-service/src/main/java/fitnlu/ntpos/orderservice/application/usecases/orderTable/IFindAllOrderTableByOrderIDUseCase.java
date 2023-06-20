package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderTableByOrderIDUseCase {
    List<Table> findAllOrderTableByOrderID(String orderID);
    List<Table> findAllOrderTableByOrderID(IPaging paging, String orderID,String sortType, String sortValue, String searchType, String searchValue);
    List<Table> findAllOrderTableByOrderID(String orderID,String sortType, String sortValue, String searchType, String searchValue);

}
