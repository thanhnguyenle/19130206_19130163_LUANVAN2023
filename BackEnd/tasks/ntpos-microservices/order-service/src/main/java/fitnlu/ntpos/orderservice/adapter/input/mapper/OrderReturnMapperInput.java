package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public class OrderReturnMapperInput {
    public static OrderReturnOutput toDTO(OrderReturn orderReturn) {
        List<OrderTableOutput> categories = orderReturn.getTableReturn()!=null?orderReturn.getTableReturn().stream().map(OrderTableMapperInput::toDTO).toList():List.of();
        List<OrderLineItemOutput> orderLineItemOutputs = orderReturn.getOrderLineItemsReturn()!=null?orderReturn.getOrderLineItemsReturn().stream()
                        .map(OrderLineItemMapperInput::toDTO).toList():List.of();
        return OrderReturnOutput.builder()
                .id(orderReturn.getId())
                .orderID(orderReturn.getOrderID())
                .orderLineItemsReturn(orderLineItemOutputs)
                .tablesReturn(categories)
                .orderReturnDate(orderReturn.getOrderReturnDate())
                .status(orderReturn.getStatus())
                .group(orderReturn.getGroup())
                .note(orderReturn.getNote())
                .userID(orderReturn.getUserID())
                .build();
    }
    public static OrderReturn toDomain(OrderReturnInput orderInput) {
        List<OrderTable> categories = orderInput.tablesReturn()!=null?orderInput.tablesReturn().stream().map(OrderTableMapperInput::toDomain).toList():List.of();
        List<OrderProduct> images = orderInput.orderLineItemsReturn()!=null?orderInput.orderLineItemsReturn().stream()
                .map(OrderLineItemMapperInput::toDomain).toList():List.of();
        return OrderReturn.builder()
                .orderID(orderInput.orderID())
                .userID(orderInput.userID())
                .group(orderInput.group())
                .orderReturnDate(orderInput.orderReturnDate())
                .orderLineItemsReturn(images)
                .status(orderInput.status())
                .note(orderInput.note())
                .tableReturn(categories)
                .build();
    }
}
