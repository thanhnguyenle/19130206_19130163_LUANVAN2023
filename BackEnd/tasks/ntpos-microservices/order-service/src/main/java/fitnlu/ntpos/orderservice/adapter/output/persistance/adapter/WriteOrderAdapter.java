package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderLineItemMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderTableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IOrderDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderPort;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class WriteOrderAdapter implements IWriteOrderPort {
    private final IOrderDBIRepository orderDBIRepository;
    @Override
    public Order createOrder(Order order) {
        Order orderOrigin = OrderMapperOutput.toDomain(orderDBIRepository.createOrder(OrderMapperOutput.toEntity(order)));
        addOrderLineItemFromOrder(orderOrigin.getId(), orderOrigin.getOrderLineItems());
        addTableToOrder(orderOrigin.getId(), orderOrigin.getTable());
        return orderOrigin;
    }

    @Override
    public Order deleteOrder(String orderID) {
        return OrderMapperOutput.toDomain(orderDBIRepository.deleteOrder(orderID));
    }

    @Override
    public Order updateOrder(String orderID, Order order) {
        return OrderMapperOutput.toDomain(orderDBIRepository.updateOrder(orderID, OrderMapperOutput.toEntity(order)));
    }

    @Override
    public boolean addOrderLineItemFromOrder(String orderID, List<OrderProduct> orderProducts) {
        return orderDBIRepository.addOrderLineItemFromOrder(orderID, orderProducts.stream().map(OrderLineItemMapperOutput::toEntities).toList());
    }

    @Override
    public boolean addTableToOrder(String orderID, List<OrderTable> orderTables) {
        return orderDBIRepository.addTableToOrder(orderID, orderTables.stream().map(OrderTableMapperOutput::toEntities).toList());
    }

    @Override
    public boolean deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) {
        return orderDBIRepository.deleteOrderLineItemFromOrder(orderID, orderLineItemIDs);
    }

    @Override
    public boolean deleteTableToOrder(String orderID, List<String> tableIDs) {
        return orderDBIRepository.deleteTableToOrder(orderID, tableIDs);
    }

    @Override
    public boolean createBatchOrders(List<Order> orders) {
        return orderDBIRepository.createBatchOrders(orders.stream().map(OrderMapperOutput::toEntity).toList());
    }
}
