package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

public class OrderTableMapperOutput {
    public static OrderTableEntities toEntities(OrderTable orderTable){
        return OrderTableEntities.builder()
                .orderID(orderTable.getOrderID())
                .tableID(orderTable.getTableID())
                .note(orderTable.getNote())
                .status(orderTable.getStatus())
                .startTime(orderTable.getStartTime())
                .endTime(orderTable.getEndTime())
                .build();
    }
    public static OrderTable toDomain(OrderTableEntities orderTableEntities) {
        return OrderTable.builder()
                .orderID(orderTableEntities.getOrderID())
                .tableID(orderTableEntities.getTableID())
                .note(orderTableEntities.getNote())
                .status(orderTableEntities.getStatus())
                .startTime(orderTableEntities.getStartTime())
                .endTime(orderTableEntities.getEndTime())
                .build();
    }
}
