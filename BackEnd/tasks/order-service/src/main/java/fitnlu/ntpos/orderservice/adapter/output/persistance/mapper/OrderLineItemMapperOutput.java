package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderLineItemEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;

import java.util.List;

public class OrderLineItemMapperOutput {
    public static OrderLineItemEntities toEntities(OrderLineItem orderLineItem){
        return OrderLineItemEntities.builder()
                .id(orderLineItem.getId())
                .productID(orderLineItem.getProductID())
                .productName(orderLineItem.getProductName())
                .productPrice(orderLineItem.getProductPrice())
                .quantity(orderLineItem.getQuantity())
                .discount(orderLineItem.getDiscount())
                .total(orderLineItem.getTotal())
                .build();
    }
    public static OrderLineItem toDomain(OrderLineItemEntities orderLineItemEntities) {
        return OrderLineItem.builder()
                .id(orderLineItemEntities.getId())
                .productID(orderLineItemEntities.getProductID())
                .productName(orderLineItemEntities.getProductName())
                .productPrice(orderLineItemEntities.getProductPrice())
                .quantity(orderLineItemEntities.getQuantity())
                .discount(orderLineItemEntities.getDiscount())
                .total(orderLineItemEntities.getTotal())
                .build();
    }
}
