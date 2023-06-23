package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadOrderTablePort {
    List<OrderTable> findAllOrderTableByOrderID(String orderID);
    List<OrderTable> findAllOrderTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTable> findAllOrderTableByOrderID(String orderID,String sortType, String sortValue, String searchType, String searchValue);
    OrderTable findOrderTableByID(String orderID, String tableID);
    List<OrderTable> findAllOrderTable() ;
    List<OrderTable> findAllOrderTableByTableID(String tableID) ;
    List<OrderTable> findOrderTableByTableID(String tableID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTable> findOrderTableByTableID(IPaging paging, String tableID, String sortType, String sortValue, String searchType, String searchValue);

}
