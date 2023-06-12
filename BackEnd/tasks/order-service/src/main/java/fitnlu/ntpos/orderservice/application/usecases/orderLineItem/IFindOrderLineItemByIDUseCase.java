package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

public interface IFindOrderLineItemByIDUseCase {
    OrderProduct findOrderLineItemByID(String id);
}
