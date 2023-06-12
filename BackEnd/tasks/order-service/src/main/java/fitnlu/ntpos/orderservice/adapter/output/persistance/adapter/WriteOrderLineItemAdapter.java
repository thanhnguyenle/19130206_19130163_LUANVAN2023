package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderLineItemMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IOrderLineItemDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderLineItemPort;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WriteOrderLineItemAdapter implements IWriteOrderLineItemPort {
    private final IOrderLineItemDBIRepository orderLineItemDBIRepository;

    @Override
    public OrderProduct updateOrderLineItem(String orderLineItemID, OrderProduct orderLineItem) {
        return OrderLineItemMapperOutput.toDomain(orderLineItemDBIRepository.updateOrderLineItem(orderLineItemID, OrderLineItemMapperOutput.toEntities(orderLineItem)));
    }
}
