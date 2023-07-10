package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

public interface IDeleteAllOrderLineItemsFromOrderUseCase {
    boolean deleteAllOrderLineItemsFromOrder(String orderID);
}
