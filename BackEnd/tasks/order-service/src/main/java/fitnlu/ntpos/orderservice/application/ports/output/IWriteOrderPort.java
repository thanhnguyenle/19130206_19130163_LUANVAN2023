package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Order;

import java.util.List;

public interface IWriteOrderPort {
    Order createOrder(Order order) ;
    Order deleteOrder(String orderID);
    Order updateOrder(String orderID, Order order) ;
    boolean addOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) ;
    boolean addTableToOrder(String orderID, List<String> tableIDs) ;
    boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) ;
    boolean deleteTableToOrder(String orderID, List<String> tableIDs);
}
