package fitnlu.ntpos.orderservice.application.usecases.order;

import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public interface IAddTableToOrderUseCase {
    boolean addTableToOrder(String orderID, List<OrderTable> orderTables);
}
