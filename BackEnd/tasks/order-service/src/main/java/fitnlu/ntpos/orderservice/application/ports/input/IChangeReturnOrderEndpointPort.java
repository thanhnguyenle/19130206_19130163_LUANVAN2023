package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;

import java.util.List;

public interface IChangeReturnOrderEndpointPort {
    OrderOutput createOrder(OrderInput orderInput) ;
    OrderOutput deleteOrder(String orderID);
    OrderOutput updateOrder(String orderID, OrderInput orderInput) ;
    ResultOutput addOrderLineItemFromOrder(String orderID, List<OrderLineItemInput> orderProducts) ;
    ResultOutput addTableToOrder(String orderID, List<OrderTableInput> orderTables) ;
    ResultOutput deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) ;
    ResultOutput deleteTableToOrder(String orderID, List<String> tableIDs);
}
