package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.GroupTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class GroupTableMapperInput {
    public static GroupOutput toDTO(GroupTable groupTable){
        List<TableOutput> tables = groupTable.getTables()!=null?groupTable.getTables().stream().map(TableMapperInput::toDTO).toList():List.of();
        return GroupOutput.builder()
                .id(groupTable.getId())
                .name(groupTable.getName())
                .note(groupTable.getNote())
                .status(groupTable.getStatus())
                .tables(tables)
                .build();

    }
    public static GroupTable toDomain(String groupID){
        return GroupTable.builder()
                .id(groupID)
                .build();
    }
    public static GroupTable toDomain(GroupInput groupInput) {
        List<Table> tables = groupInput.tables()!=null?groupInput.tables().stream().map(TableMapperInput::toDomain).toList():List.of();
        return GroupTable.builder()
                .name(groupInput.name())
                .note(groupInput.note())
                .status(groupInput.status())
                .tables(tables)
                .build();
    }
}
