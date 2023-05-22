package fitnlu.ntpos.orderservice.application.usecases;

import fitnlu.ntpos.orderservice.domain.model.Order;

public interface ICreateOrderUseCase {
     Order createOrder(Order order);
}
