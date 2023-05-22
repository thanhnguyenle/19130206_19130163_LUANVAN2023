package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;

public interface ICreateOrderLineItemUseCase {
    OrderLineItem createOrderLineItem(OrderLineItem orderLineItem);
}
