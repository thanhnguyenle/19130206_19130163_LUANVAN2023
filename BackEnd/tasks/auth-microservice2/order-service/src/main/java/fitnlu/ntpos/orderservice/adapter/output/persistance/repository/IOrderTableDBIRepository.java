package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;


import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IOrderTableDBIRepository {
    OrderTableEntities updateOrderTable(String orderID, String tableID, OrderTableEntities orderTableEntities);
    List<OrderTableEntities> findAllOrderTable() ;
    OrderTableEntities findOrderTableByID(String orderID, String tableID);
    List<OrderTableEntities> findAllOrderTableByOrderID(String orderID);
    List<OrderTableEntities> findAllOrderTableByOrderID(IPaging paging, String orderID,String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTableEntities> findAllOrderTableByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTableEntities> findAllOrderTableByTableID(String tableID) ;
    List<OrderTableEntities> findOrderTableByTableID(String tableID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTableEntities> findOrderTableByTableID(IPaging paging, String tableID, String sortType, String sortValue, String searchType, String searchValue);

}
