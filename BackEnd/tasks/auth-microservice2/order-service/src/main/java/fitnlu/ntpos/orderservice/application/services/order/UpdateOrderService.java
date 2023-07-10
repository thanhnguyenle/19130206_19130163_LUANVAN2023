package fitnlu.ntpos.orderservice.application.services.order;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.order.*;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UpdateOrderService implements IUpdateOrderUseCase,
        IAddTableToOrderUseCase,
        IDeleteTableFromOrderUseCase,
        IAddOrderLineItemToOrderUseCase,
        IDeleteOrderLineItemFromOrderUseCase{
    private final IWriteOrderPort writeOrderPort;

    @Override
    public Order updateOrder(String orderID, Order order) {
        return writeOrderPort.updateOrder(orderID,order);
    }

    @Override
    public boolean addOrderLineItemFromOrder(String orderID, List<OrderProduct> orderProducts) {
        return writeOrderPort.addOrderLineItemFromOrder(orderID,orderProducts);
    }

    @Override
    public boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) {
        return writeOrderPort.deleteOrderLineItemFromOrder(orderID,orderLineItemIDs);
    }

    @Override
    public boolean deleteTableToOrder(String orderID, List<String> tableIDs) {
        return writeOrderPort.deleteTableToOrder(orderID,tableIDs);
    }

    @Override
    public boolean addTableToOrder(String orderID, List<OrderTable> orderTables) {
        return writeOrderPort.addTableToOrder(orderID,orderTables);
    }
}
