package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemOutput;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

public class OrderLineItemMapperInput {
    public static OrderLineItemOutput toDTO(OrderProduct orderProduct){
        return OrderLineItemOutput.builder()
                .orderID(orderProduct.getOrderID())
                .productID(orderProduct.getProductID())
                .price(orderProduct.getPrice())
                .discount(orderProduct.getDiscount())
                .quantity(orderProduct.getQuantity())
                .name(orderProduct.getName())
                .build();
    }
    public static OrderProduct toDomain(OrderLineItemInput orderLineItemInput) {
        return OrderProduct.builder()
                .productID(orderLineItemInput.productID())
                .price(orderLineItemInput.price())
                .discount(orderLineItemInput.discount())
                .quantity(orderLineItemInput.quantity())
                .name(orderLineItemInput.name())
                .build();
    }
}
