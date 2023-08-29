package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class OrderMapperInput {
    public static OrderOutput toDTO(Order order) {
        List<OrderTableOutput> categories = order.getTable()!=null?order.getTable().stream().map(OrderTableMapperInput::toDTO).toList():List.of();
        List<OrderLineItemOutput> orderLineItemOutputs = order.getOrderLineItems()!=null?order.getOrderLineItems().stream()
                        .map(OrderLineItemMapperInput::toDTO).toList():List.of();
        return OrderOutput.builder()
                .id(order.getId())
                .orderLineItems(orderLineItemOutputs)
                .tables(categories)
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .group(order.getGroup())
                .note(order.getNote())
                .userID(order.getUserID())
                .build();
    }
    public static Order toDomain(OrderInput orderInput) {
        List<OrderTable> categories = orderInput.tables()!=null?orderInput.tables().stream().map(OrderTableMapperInput::toDomain).toList():List.of();
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
