package fitnlu.ntpos.orderservice.application.usecases;

import fitnlu.ntpos.orderservice.domain.model.Order;

public interface IUpdateOrderUseCase {
    Order updateOrder(String orderID, Order order);
}
