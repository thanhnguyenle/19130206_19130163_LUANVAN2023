package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderLineItemEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class OrderMapperOutput {
    public static OrderEntities toEntity(Order order) {
        List<TableEntities> categories = order.getTable()!=null?order.getTable().stream().map(TableMapperOutput::toEntities).toList():List.of();
        List<OrderLineItemEntities> images = order.getOrderLineItems()!=null?order.getOrderLineItems().stream()
                        .map(OrderLineItemMapperOutput::toEntities).toList():List.of();
        return OrderEntities.builder()
                .id(order.getId())
                .orderLineItems(images)
                .table(categories)
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .numberOfPeople(order.getNumberOfPeople())
                .group(order.getGroup())
                .note(order.getNote())
                .userID(order.getUserID())
                .build();
    }
    public static Order toDomain(OrderEntities orderEntities) {
        List<Table> categories = orderEntities.getTable()!=null?orderEntities.getTable().stream().map(TableMapperOutput::toDomain).toList():List.of();
        List<OrderLineItem> images = orderEntities.getOrderLineItems()!=null?orderEntities.getOrderLineItems().stream()
                .map(OrderLineItemMapperOutput::toDomain).toList():List.of();
        return Order.builder()
                .id(orderEntities.getId())
                .orderLineItems(images)
                .table(categories)
                .orderDate(orderEntities.getOrderDate())
                .status(orderEntities.getStatus())
                .numberOfPeople(orderEntities.getNumberOfPeople())
                .group(orderEntities.getGroup())
                .note(orderEntities.getNote())
                .userID(orderEntities.getUserID())
                .build();
    }
}
