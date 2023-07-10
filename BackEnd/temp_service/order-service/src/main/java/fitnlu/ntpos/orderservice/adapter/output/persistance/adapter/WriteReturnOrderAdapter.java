package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderLineItemMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderReturnMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderTableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IReturnOrderDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteReturnOrderPort;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class WriteReturnOrderAdapter implements IWriteReturnOrderPort {
    private final IReturnOrderDBIRepository orderDBIRepository;

    @Override
    public OrderReturn createOrderReturn(OrderReturn orderReturn) {
        return OrderReturnMapperOutput.toDomain(orderDBIRepository.createOrderReturn(orderReturn));
    }

    @Override
    public OrderReturn deleteOrderReturn(String id) {
        return OrderReturnMapperOutput.toDomain(orderDBIRepository.deleteOrderReturn(id));
    }

    @Override
    public OrderReturn updateOrderReturn(String id, OrderReturn orderReturn) {
        return OrderReturnMapperOutput.toDomain(orderDBIRepository.updateOrderReturn(id, orderReturn));
    }

    @Override
    public boolean addOrderLineItemToReturnOrder(String orderID, List<OrderProduct> orderProducts) {
        return orderDBIRepository.addOrderLineItemToReturnOrder(orderID, orderProducts.stream().map(OrderLineItemMapperOutput::toEntities).toList());
    }

    @Override
    public boolean addTableToReturnOrder(String orderID, List<OrderTable> orderTables) {
        return orderDBIRepository.addTableToReturnOrder(orderID, orderTables.stream().map(OrderTableMapperOutput::toEntities).toList());
    }

    @Override
    public boolean deleteAllOrderItemFromReturnOrder(String orderItemID) {
        return orderDBIRepository.deleteAllOrderItemFromReturnOrder(orderItemID);
    }

    @Override
    public boolean deleteAllTableFromReturnOrder(String tableID) {
        return orderDBIRepository.deleteAllTableFromReturnOrder(tableID);
    }


}
