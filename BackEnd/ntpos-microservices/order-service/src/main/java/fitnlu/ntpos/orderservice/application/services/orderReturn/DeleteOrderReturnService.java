package fitnlu.ntpos.orderservice.application.services.orderReturn;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteReturnOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.IDeleteOrderReturnUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteOrderReturnService implements IDeleteOrderReturnUseCase {
    private final IWriteReturnOrderPort writeOrderReturnPort;
    @Override
    public OrderReturn deleteOrderReturn(String id) {
        return writeOrderReturnPort.deleteOrderReturn(id);
    }
}
