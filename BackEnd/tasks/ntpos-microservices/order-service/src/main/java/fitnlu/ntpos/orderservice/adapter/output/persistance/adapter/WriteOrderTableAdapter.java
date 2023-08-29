package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderTableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IOrderTableDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderTablePort;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WriteOrderTableAdapter implements IWriteOrderTablePort {
    private final IOrderTableDBIRepository orderTableDBIRepository;
    @Override
    public OrderTable updateOrderTable(String orderID, String tableID, OrderTable orderTable) {
        return OrderTableMapperOutput.toDomain(orderTableDBIRepository.updateOrderTable(orderID, tableID, OrderTableMapperOutput.toEntities(orderTable)));
    }
}
