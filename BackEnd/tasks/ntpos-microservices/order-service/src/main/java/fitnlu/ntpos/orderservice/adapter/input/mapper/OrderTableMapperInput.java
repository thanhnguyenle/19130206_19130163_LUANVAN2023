package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.input.dto.OrderTableInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderTableOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

public class OrderTableMapperInput {
    public static OrderTableOutput toDTO(OrderTable orderTable){
        return OrderTableOutput.builder()
                .orderID(orderTable.getOrderID())
                .tableID(orderTable.getTableID())
                .note(orderTable.getNote())
                .status(orderTable.getStatus())
                .startTime(orderTable.getStartTime())
                .endTime(orderTable.getEndTime())
                .name(orderTable.getName())
                .build();
    }
    public static OrderTable toDomain(OrderTableInput orderTableInput) {
        return OrderTable.builder()
                .tableID(orderTableInput.tableID())
                .note(orderTableInput.note())
                .status(orderTableInput.status())
                .startTime(orderTableInput.startTime())
                .endTime(orderTableInput.endTime())
                .name(orderTableInput.name())
                .build();
    }
}
