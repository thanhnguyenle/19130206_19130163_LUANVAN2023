package fitnlu.ntpos.orderservice.application.services.order;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.order.IDeleteOrderUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteOrderService implements IDeleteOrderUseCase {
    private final IWriteOrderPort writeOrderPort;
    @Override
    public Order deleteOrder(String orderID) {
        return writeOrderPort.deleteOrder(orderID);
    }
}
