package fitnlu.ntpos.orderservice.application.usecases.orderTable;

import fitnlu.ntpos.orderservice.domain.model.OrderTable;

public interface IFindOrderTableByIDUseCase {
    OrderTable findOrderTableByID(String orderID, String tableID);
}
