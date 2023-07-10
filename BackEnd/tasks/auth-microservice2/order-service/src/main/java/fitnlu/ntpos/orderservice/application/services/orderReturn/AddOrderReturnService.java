package fitnlu.ntpos.orderservice.application.services.orderReturn;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteReturnOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.ICreateOrderReturnUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddOrderReturnService implements ICreateOrderReturnUseCase {
    private final IWriteReturnOrderPort writeOrderReturnPort;
    @Override
    public OrderReturn createOrderReturn(OrderReturn orderReturn) {
        return writeOrderReturnPort.createOrderReturn(orderReturn);
    }
}
