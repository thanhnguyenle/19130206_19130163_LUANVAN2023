package fitnlu.ntpos.orderservice.application.services.orderLineItem;

import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IDeleteOrderLineItemUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IUpdateOrderLineItemUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;

public class UpdateOrderLineItemService implements IUpdateOrderLineItemUseCase {

    @Override
    public OrderLineItem updateOrderLineItem(String orderLineItemID, OrderLineItem orderLineItem) {
        return null;
    }
}
