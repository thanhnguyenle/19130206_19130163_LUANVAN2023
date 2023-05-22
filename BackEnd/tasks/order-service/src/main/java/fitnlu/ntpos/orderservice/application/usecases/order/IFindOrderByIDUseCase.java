package fitnlu.ntpos.orderservice.application.usecases;

import fitnlu.ntpos.orderservice.domain.model.Order;

public interface IFindOrderByIDUseCase {
    Order findOrderByID(String orderID);
}
