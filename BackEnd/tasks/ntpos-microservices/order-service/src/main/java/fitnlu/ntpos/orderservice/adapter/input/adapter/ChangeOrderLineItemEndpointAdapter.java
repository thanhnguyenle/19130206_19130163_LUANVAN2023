package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IChangeOrderLineItemEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IDeleteAllOrderLineItemsFromOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IUpdateOrderLineItemUseCase;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class ChangeOrderLineItemEndpointAdapter implements IChangeOrderLineItemEndpointPort {
    private final IUpdateOrderLineItemUseCase updateOrderLineItemUseCase;
    private final IDeleteAllOrderLineItemsFromOrderUseCase deleteAllOrderLineItemsFromOrderUseCase;
    @Override
    public OrderLineItemOutput updateOrderLineItem(String orderID, String productID, OrderLineItemInput orderLineItemInput) {
        return OrderLineItemMapperInput.toDTO(updateOrderLineItemUseCase.updateOrderLineItem(orderID,productID, OrderLineItemMapperInput.toDomain(orderLineItemInput)));
    }

    @Override
    public ResultOutput deleteAllOrderLineItemsFromOrderUseCase(String orderID) {
        return ResultOutput.builder()
                .success(deleteAllOrderLineItemsFromOrderUseCase.deleteAllOrderLineItemsFromOrder(orderID))
                .build();
    }
}
