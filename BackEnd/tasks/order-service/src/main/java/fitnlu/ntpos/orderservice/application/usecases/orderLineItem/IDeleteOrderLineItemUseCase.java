package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;

public interface IDeleteOrderLineItemUseCase {
    OrderLineItem deleteOrderLineItem(String id);
}
