package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

public interface IChangeOrderLineItemEndpointPort {
    OrderLineItemOutput updateOrderLineItem(String orderID, String productID, OrderLineItemInput orderLineItemInput);
    ResultOutput deleteAllOrderLineItemsFromOrderUseCase(String orderID);
}
