package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IChangeOrderLineItemEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IUpdateOrderLineItemUseCase;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class ChangeOrderLineItemEndpointAdapter implements IChangeOrderLineItemEndpointPort {
    private final IUpdateOrderLineItemUseCase updateOrderLineItemUseCase;
    @Override
    public OrderLineItemOutput updateOrderLineItem(String orderLineItemID, OrderLineItemInput orderLineItemInput) {
        return OrderLineItemMapperInput.toDTO(updateOrderLineItemUseCase.updateOrderLineItem(orderLineItemID, OrderLineItemMapperInput.toDomain(orderLineItemInput)));
    }
}
