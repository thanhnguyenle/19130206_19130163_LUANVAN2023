package fitnlu.ntpos.orderservice.application.services.order;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.order.ICreateOrderUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddOrderService implements ICreateOrderUseCase {
    private final IWriteOrderPort writeOrderPort;
    @Override
    public Order createOrder(Order order) {
        return writeOrderPort.createOrder(order);
    }
}
