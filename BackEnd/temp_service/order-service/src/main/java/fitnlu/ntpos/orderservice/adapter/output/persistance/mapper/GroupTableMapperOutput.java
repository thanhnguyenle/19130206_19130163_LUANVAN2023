package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.GroupTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class GroupTableMapperOutput {
    public static GroupTableEntities toEntities(GroupTable groupTable){
        List<TableEntities> tables = groupTable.getTables()!=null?groupTable.getTables().stream().map(TableMapperOutput::toEntities).toList():List.of();
        return GroupTableEntities.builder()
                .id(groupTable.getId())
                .name(groupTable.getName())
                .note(groupTable.getNote())
                .status(groupTable.getStatus())
                .tables(tables)
                .build();

    }
    public static GroupTable toDomain(GroupTableEntities tableEntities) {
        List<Table> tables = tableEntities.getTables()!=null?tableEntities.getTables().stream().map(TableMapperOutput::toDomain).toList():List.of();
        return GroupTable.builder()
                .id(tableEntities.getId())
                .name(tableEntities.getName())
                .note(tableEntities.getNote())
                .status(tableEntities.getStatus())
                .tables(tables)
                .build();
    }
}
