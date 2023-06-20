package fitnlu.ntpos.orderservice.application.usecases.orderTable;

import fitnlu.ntpos.orderservice.domain.model.OrderTable;

public interface IFindAllOrderTableUseCase {
    OrderTable findOrderTableByID(String orderID, String tableID);
}
