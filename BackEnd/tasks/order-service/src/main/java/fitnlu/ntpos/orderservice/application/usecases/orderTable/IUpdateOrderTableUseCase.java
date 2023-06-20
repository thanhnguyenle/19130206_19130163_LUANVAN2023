package fitnlu.ntpos.orderservice.application.usecases.orderTable;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

public interface IUpdateOrderTableUseCase {
    OrderProduct updateOrderLineItem(String orderLineItemID, OrderProduct orderLineItem);
}
