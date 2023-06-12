package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

public class OrderLineItemMapperOutput {
    public static OrderProductEntities toEntities(OrderProduct orderProduct){
        return OrderProductEntities.builder()
                .orderID(orderProduct.getOrderID())
                .productID(orderProduct.getProductID())
                .price(orderProduct.getPrice())
                .discount(orderProduct.getDiscount())
                .quantity(orderProduct.getQuantity())
                .build();
    }
    public static OrderProduct toDomain(OrderProductEntities orderProductEntities) {
        return OrderProduct.builder()
                .orderID(orderProductEntities.getOrderID())
                .productID(orderProductEntities.getProductID())
                .price(orderProductEntities.getPrice())
                .discount(orderProductEntities.getDiscount())
                .quantity(orderProductEntities.getQuantity())
                .build();
    }
}
