package fitnlu.ntpos.orderservice.application.usecases.order;

import java.util.List;

public interface IAddOrderLineItemToOrderUseCase {
    boolean addOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs);
}
