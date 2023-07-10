package fitnlu.ntpos.orderservice.application.usecases.orderTable;

import fitnlu.ntpos.orderservice.domain.model.OrderTable;

public interface IUpdateOrderTableUseCase {
    OrderTable updateOrderTable(String orderID,String tableID, OrderTable orderTable);
}
