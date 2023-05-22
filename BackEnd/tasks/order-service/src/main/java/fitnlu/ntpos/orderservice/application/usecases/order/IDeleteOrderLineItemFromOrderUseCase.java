package fitnlu.ntpos.orderservice.application.usecases.order;

import java.util.List;

public interface IDeleteOrderLineItemFromOrderUseCase {
    boolean addTableToOrder(String orderID, List<String> tableIDs);
}
