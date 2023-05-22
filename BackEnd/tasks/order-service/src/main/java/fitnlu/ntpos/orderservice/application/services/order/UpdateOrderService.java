package fitnlu.ntpos.orderservice.application.services.order;

import fitnlu.ntpos.orderservice.application.usecases.order.*;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IDeleteOrderLineItemUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;

import java.util.List;

public class UpdateOrderService implements IUpdateOrderUseCase,
        IAddTableToOrderUseCase,
        IDeleteTableFromOrderUseCase,
        IAddOrderLineItemToOrderUseCase,
        IDeleteOrderLineItemFromOrderUseCase{

    @Override
    public Order updateOrder(String orderID, Order order) {
        return null;
    }

    @Override
    public boolean addOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) {
        return false;
    }

    @Override
    public boolean addTableToOrder(String orderID, List<String> tableIDs) {
        return false;
    }

    @Override
    public boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) {
        return false;
    }

    @Override
    public boolean deleteTableToOrder(String orderID, List<String> tableIDs) {
        return false;
    }
}
