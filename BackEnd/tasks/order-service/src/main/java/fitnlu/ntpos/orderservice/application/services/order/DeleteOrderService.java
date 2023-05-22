package fitnlu.ntpos.orderservice.application.services.order;

import fitnlu.ntpos.orderservice.application.usecases.order.IDeleteOrderUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;

public class DeleteOrderService implements IDeleteOrderUseCase {
    @Override
    public Order deleteOrder(String orderID) {
        return null;
    }
}
