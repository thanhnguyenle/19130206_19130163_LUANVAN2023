package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Table;

public class GroupTableMapperOutput {
    public static TableEntities toEntities(Table table){
        return TableEntities.builder()
                .id(table.getId())
                .name(table.getName())
                .numberOfPeople(table.getNumberOfPeople())
                .status(table.getStatus())
                .note(table.getNote())
                .startTime(table.getStartTime())
                .endTime(table.getEndTime())
                .build();
    }
    public static Table toDomain(TableEntities tableEntities) {
        return Table.builder()
                .id(tableEntities.getId())
                .name(tableEntities.getName())
                .numberOfPeople(tableEntities.getNumberOfPeople())
                .status(tableEntities.getStatus())
                .note(tableEntities.getNote())
                .startTime(tableEntities.getStartTime())
                .endTime(tableEntities.getEndTime())
                .build();
    }
}
