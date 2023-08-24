package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.*;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public class OrderReturnMapperOutput {
    public static OrderReturnEntities toEntity(OrderReturn orderReturn) {
        List<OrderTableEntities> categories = orderReturn.getTableReturn()!=null?orderReturn.getTableReturn().stream().map(OrderTableMapperOutput::toEntities).toList():List.of();
        List<OrderProductEntities> images = orderReturn.getOrderLineItemsReturn()!=null?orderReturn.getOrderLineItemsReturn().stream()
                        .map(OrderLineItemMapperOutput::toEntities).toList():List.of();
        return OrderReturnEntities.builder()
                .id(orderReturn.getId())
                .orderID(orderReturn.getOrderID())
                .orderLineItemsReturn(images)
                .tableReturn(categories)
                .orderReturnDate(orderReturn.getOrderReturnDate())
                .status(orderReturn.getStatus())
                .group(orderReturn.getGroup())
                .note(orderReturn.getNote())
                .userID(orderReturn.getUserID())
                .build();
    }
    public static OrderReturnTableEntities toEntity(OrderTable orderTable) {
        return OrderReturnTableEntities.builder()
                .orderReturnID(orderTable.getOrderID())
                .tableReturnID(orderTable.getTableID())
                .startTime(orderTable.getStartTime())
                .endTime(orderTable.getEndTime())
                .note(orderTable.getNote())
                .name(orderTable.getName())
                .build();
    }
    public static OrderReturnProductEntities toEntity(OrderProduct orderProduct) {
        return OrderReturnProductEntities.builder()
                .orderReturnID(orderProduct.getOrderID())
                .productID(orderProduct.getProductID())
                .discount(orderProduct.getDiscount())
                .quantity(orderProduct.getQuantity())
                .price(orderProduct.getPrice())
                .name(orderProduct.getName())
                .build();
    }
    public static OrderTable toDomain(OrderReturnTableEntities orderTableEntities) {
        return OrderTable.builder()
                .orderID(orderTableEntities.getOrderReturnID())
                .tableID(orderTableEntities.getTableReturnID())
                .startTime(orderTableEntities.getStartTime())
                .endTime(orderTableEntities.getEndTime())
                .note(orderTableEntities.getNote())
                .name(orderTableEntities.getName())
                .build();
    }
    public static OrderProduct toDomain(OrderReturnProductEntities orderProductEntities) {
        return OrderProduct.builder()
                .orderID(orderProductEntities.getOrderReturnID())
                .productID(orderProductEntities.getProductID())
                .discount(orderProductEntities.getDiscount())
                .price(orderProductEntities.getPrice())
                .name(orderProductEntities.getName())
                .quantity(orderProductEntities.getQuantity())
                .build();
    }
    public static OrderReturn toDomain(OrderReturnEntities orderEntities) {
        List<OrderTable> categories = orderEntities.getTableReturn()!=null?orderEntities.getTableReturn().stream().map(OrderTableMapperOutput::toDomain).toList():List.of();
        List<OrderProduct> images = orderEntities.getOrderLineItemsReturn()!=null?orderEntities.getOrderLineItemsReturn().stream()
                .map(OrderLineItemMapperOutput::toDomain).toList():List.of();
        return OrderReturn.builder()
                .id(orderEntities.getId())
                .orderID(orderEntities.getOrderID())
                .orderLineItemsReturn(images)
                .tableReturn(categories)
                .orderReturnDate(orderEntities.getOrderReturnDate())
                .status(orderEntities.getStatus())
                .group(orderEntities.getGroup())
                .note(orderEntities.getNote())
                .userID(orderEntities.getUserID())
                .build();
    }
}
