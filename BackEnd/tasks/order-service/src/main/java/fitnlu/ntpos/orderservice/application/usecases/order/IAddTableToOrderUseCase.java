package fitnlu.ntpos.orderservice.application.usecases.order;

import fitnlu.ntpos.orderservice.domain.model.Order;

public interface IAddTableToOrderUseCase {
    Order updateOrder(String orderID, Order order);
}
