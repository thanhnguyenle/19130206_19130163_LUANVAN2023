package fitnlu.ntpos.orderservice.application.usecases.order;

import fitnlu.ntpos.orderservice.domain.model.Order;

import java.util.List;

public interface ICreateOrderUseCase {
     Order createOrder(Order order);

     boolean createBatchOrders(List<Order> orders);
}
