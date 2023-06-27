package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.input.dto.OrderInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class OrderMapperInput {
    public static OrderOutput toDTO(Order order) {
        List<TableOutput> categories = order.getTable()!=null?order.getTable().stream().map(TableMapperInput::toDTO).toList():List.of();
        List<OrderLineItemOutput> orderLineItemOutputs = order.getOrderLineItems()!=null?order.getOrderLineItems().stream()
                        .map(OrderLineItemMapperInput::toDTO).toList():List.of();
        return OrderOutput.builder()
                .id(order.getId())
                .orderLineItems(orderLineItemOutputs)
                .table(categories)
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .numberOfPeople(order.getNumberOfPeople())
                .group(order.getGroup())
                .note(order.getNote())
                .userID(order.getUserID())
                .build();
    }
    public static Order toDomain(OrderInput orderInput) {
        List<Table> categories = orderInput.tables()!=null?orderInput.tables().stream().map(TableMapperInput::toDomain).toList():List.of();
        List<OrderProduct> images = orderInput.orderLineItems()!=null?orderInput.orderLineItems().stream()
                .map(OrderLineItemMapperInput::toDomain).toList():List.of();
        return Order.builder()
                .userID(orderInput.userID())
                .group(orderInput.group())
                .orderDate(orderInput.orderDate())
                .orderLineItems(images)
                .status(orderInput.status())
                .note(orderInput.note())
                .table(categories)
                .build();
    }
}
