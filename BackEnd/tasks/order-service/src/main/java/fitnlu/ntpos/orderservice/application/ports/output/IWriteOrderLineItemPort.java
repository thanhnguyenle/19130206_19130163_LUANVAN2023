package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

public interface IWriteOrderLineItemPort {
    OrderProduct updateOrderLineItem(String orderLineItemID, OrderProduct orderLineItem);
}
