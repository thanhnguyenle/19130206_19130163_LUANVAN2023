package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IWriteOrderTablePort {
    List<OrderTable> findAllOrderTableByOrderID(String orderID);
    List<OrderTable> findAllOrderTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTable> findAllOrderTableByOrderID(String orderID,String sortType, String sortValue, String searchType, String searchValue);
    OrderTable findOrderTableByID(String id);
}
