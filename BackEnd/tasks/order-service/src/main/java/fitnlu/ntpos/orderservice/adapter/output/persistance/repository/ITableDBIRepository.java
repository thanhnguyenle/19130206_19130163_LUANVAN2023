package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface ITableDBIRepository {
    List<OrderEntities> findAllOrderByUserID(String userID);
    List<OrderEntities> filterOrder(IPaging paging, String userID,TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) ;
    List<OrderEntities> filterOrder(String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) ;
    List<OrderEntities> findAllOrder();
    OrderEntities findOrderByID(String orderID);
    OrderEntities createOrder(OrderEntities orderEntities) ;
    OrderEntities deleteOrder(String orderID);
    OrderEntities updateOrder(String orderID, OrderEntities orderEntities) ;
    boolean addOrderLineItemFromOrder(String orderID, List<OrderProductEntities> orderProductEntities) ;
    boolean addTableToOrder(String orderID, List<OrderTableEntities> orderTableEntities) ;
    boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) ;
    boolean deleteTableToOrder(String orderID, List<String> tableIDs);
}
