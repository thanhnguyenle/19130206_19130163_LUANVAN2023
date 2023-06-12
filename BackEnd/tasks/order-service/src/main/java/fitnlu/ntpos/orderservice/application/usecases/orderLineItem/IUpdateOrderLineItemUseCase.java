package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

public interface IUpdateOrderLineItemUseCase {
    OrderProduct updateOrderLineItem(String orderLineItemID, OrderProduct orderLineItem);
}
