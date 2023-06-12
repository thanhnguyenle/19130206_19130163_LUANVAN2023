package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.GroupTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class OrderTableMapperOutput {
    public static TableEntities toEntities(Table table){
        List<GroupTableEntities> groups = table.getGroups()!=null?table.getGroups().stream().map(GroupTableMapperOutput::toEntities).toList():List.of();
        return TableEntities.builder()
                .id(table.getId())
                .name(table.getName())
                .numberOfPeople(table.getNumberOfPeople())
                .status(table.getStatus())
                .note(table.getNote())
                .groups(groups)
                .build();
    }
    public static Table toDomain(TableEntities tableEntities) {
        List<GroupTable> groups = tableEntities.getGroups()!=null?tableEntities.getGroups().stream().map(GroupTableMapperOutput::toDomain).toList():List.of();
        return Table.builder()
                .id(tableEntities.getId())
                .name(tableEntities.getName())
                .numberOfPeople(tableEntities.getNumberOfPeople())
                .status(tableEntities.getStatus())
                .note(tableEntities.getNote())
                .groups(groups)
                .build();
    }
}
