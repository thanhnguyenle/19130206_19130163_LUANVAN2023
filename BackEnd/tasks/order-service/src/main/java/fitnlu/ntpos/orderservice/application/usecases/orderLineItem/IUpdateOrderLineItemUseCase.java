package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;

public interface IUpdateOrderLineItemUseCase {
    OrderLineItem updateOrderLineItem(String orderLineItemID, OrderLineItem orderLineItem);
}
