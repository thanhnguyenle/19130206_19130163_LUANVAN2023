package fitnlu.ntpos.orderservice.application.services.orderReturn;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteReturnOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.IUpdateOrderReturnUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UpdateOrderReturnService implements IUpdateOrderReturnUseCase {
    private final IWriteReturnOrderPort writeOrderReturnPort;
    @Override
    public OrderReturn updateOrderReturn(String id, OrderReturn orderReturn) {
        return writeOrderReturnPort.updateOrderReturn(id, orderReturn);
    }

    @Override
    public boolean addOrderLineItemToReturnOrder(String orderID, List<OrderProduct> orderProducts) {
        return writeOrderReturnPort.addOrderLineItemToReturnOrder(orderID, orderProducts);
    }

    @Override
    public boolean addTableToReturnOrder(String orderID, List<OrderTable> orderTables) {
        return writeOrderReturnPort.addTableToReturnOrder(orderID, orderTables);
    }

    @Override
    public boolean deleteAllOrderItemFromReturnOrder(String orderItemID) {
        return writeOrderReturnPort.deleteAllOrderItemFromReturnOrder(orderItemID);
    }

    @Override
    public boolean deleteAllTableFromReturnOrder(String tableID) {
        return writeOrderReturnPort.deleteAllTableFromReturnOrder(tableID);
    }
}
