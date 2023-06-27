package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public interface IWriteOrderPort {
    Order createOrder(Order order) ;
    Order deleteOrder(String orderID);
    Order updateOrder(String orderID, Order order) ;
    boolean addOrderLineItemFromOrder(String orderID, List<OrderProduct> orderProducts) ;
    boolean addTableToOrder(String orderID, List<OrderTable> orderTables) ;
    boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) ;
    boolean deleteTableToOrder(String orderID, List<String> tableIDs);
}
