package fitnlu.ntpos.orderservice.application.usecases.order;

import java.util.List;

public interface IDeleteOrderLineItemFromOrderUseCase {
    boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs);
}
