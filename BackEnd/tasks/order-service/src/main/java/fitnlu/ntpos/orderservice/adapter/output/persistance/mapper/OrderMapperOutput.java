package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class OrderMapperOutput {
    public static OrderEntities toEntity(Order order) {
        List<OrderTableEntities> categories = order.getTable()!=null?order.getTable().stream().map(OrderTableMapperOutput::toEntities).toList():List.of();
        List<OrderProductEntities> images = order.getOrderLineItems()!=null?order.getOrderLineItems().stream()
                        .map(OrderLineItemMapperOutput::toEntities).toList():List.of();
        return OrderEntities.builder()
                .id(order.getId())
                .orderLineItems(images)
                .table(categories)
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .group(order.getGroup())
                .note(order.getNote())
                .userID(order.getUserID())
                .build();
    }
    public static Order toDomain(OrderEntities orderEntities) {
        List<OrderTable> categories = orderEntities.getTable()!=null?orderEntities.getTable().stream().map(OrderTableMapperOutput::toDomain).toList():List.of();
        List<OrderProduct> images = orderEntities.getOrderLineItems()!=null?orderEntities.getOrderLineItems().stream()
                .map(OrderLineItemMapperOutput::toDomain).toList():List.of();
        return Order.builder()
                .id(orderEntities.getId())
                .orderLineItems(images)
                .table(categories)
                .orderDate(orderEntities.getOrderDate())
                .status(orderEntities.getStatus())
                .group(orderEntities.getGroup())
                .note(orderEntities.getNote())
                .userID(orderEntities.getUserID())
                .build();
    }
}
