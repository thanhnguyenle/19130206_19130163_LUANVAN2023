package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;

import java.util.List;

public interface IWriteOrderLineItemPort {
    OrderLineItem createOrderLineItem(OrderLineItem orderLineItem);
    OrderLineItem deleteOrderLineItem(String id);
    OrderLineItem updateOrderLineItem(String orderLineItemID, OrderLineItem orderLineItem);
}
