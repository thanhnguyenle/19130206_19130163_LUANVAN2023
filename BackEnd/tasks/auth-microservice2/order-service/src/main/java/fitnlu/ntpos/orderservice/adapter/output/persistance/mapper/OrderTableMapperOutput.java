package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.GroupTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class OrderTableMapperOutput {
    public static OrderTableEntities toEntities(OrderTable orderTable){
        return OrderTableEntities.builder()
                .orderID(orderTable.getOrderID())
                .tableID(orderTable.getTableID())
                .note(orderTable.getNote())
                .status(orderTable.getStatus())
                .startTime(orderTable.getStartTime())
                .endTime(orderTable.getEndTime())
                .name(orderTable.getName())
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
                .name(orderTableEntities.getName())
                .build();
    }
}
