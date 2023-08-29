package fitnlu.ntpos.orderservice.application.services.orderTable;

import fitnlu.ntpos.orderservice.application.usecases.orderTable.IUpdateOrderTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

public class UpdateOrderTableService implements IUpdateOrderTableUseCase {
    @Override
    public OrderTable updateOrderTable(String orderID, String tableID, OrderTable orderTable) {
        return null;
    }
}
