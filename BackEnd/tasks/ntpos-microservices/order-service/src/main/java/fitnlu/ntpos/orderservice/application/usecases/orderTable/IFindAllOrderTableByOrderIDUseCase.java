package fitnlu.ntpos.orderservice.application.usecases.orderTable;

import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderTableByOrderIDUseCase {
    List<OrderTable> findAllOrderTableByOrderID(String orderID);
    List<OrderTable> findAllOrderTableByOrderID(IPaging paging, String orderID,String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTable> findAllOrderTableByOrderID(String orderID,String sortType, String sortValue, String searchType, String searchValue);

}
