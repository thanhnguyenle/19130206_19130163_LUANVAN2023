package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IOrderLineItemDBIRepository {

    OrderProductEntities updateOrderLineItem(String orderLineItemID, OrderProductEntities orderProductEntities);
    List<OrderProductEntities> findAllOrderLineItemByOrderID(String orderID) ;
    List<OrderProductEntities> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) ;
    List<OrderProductEntities> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) ;
    OrderProductEntities findOrderLineItemByID(String id);
}
