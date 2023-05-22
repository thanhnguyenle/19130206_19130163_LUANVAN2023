package fitnlu.ntpos.orderservice.application.usecases;

import fitnlu.ntpos.orderservice.domain.model.Order;

public interface IDeleteOrderUseCase {
    Order deleteOrder(String orderID);
}
