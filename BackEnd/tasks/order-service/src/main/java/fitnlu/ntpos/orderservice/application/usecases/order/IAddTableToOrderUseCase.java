package fitnlu.ntpos.orderservice.application.usecases.order;

import fitnlu.ntpos.orderservice.domain.model.Order;

import java.util.List;

public interface IAddTableToOrderUseCase {
    boolean addTableToOrder(String orderID, List<String> tableIDs);
}
