package fitnlu.ntpos.orderservice.application.usecases.order;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

import java.util.List;

public interface IAddOrderLineItemToOrderUseCase {
    boolean addOrderLineItemFromOrder(String orderID, List<OrderProduct> orderProducts);
}
