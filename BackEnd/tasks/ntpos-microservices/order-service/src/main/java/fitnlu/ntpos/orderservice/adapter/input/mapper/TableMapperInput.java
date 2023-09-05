package fitnlu.ntpos.orderservice.adapter.input.mapper;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.GroupTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class TableMapperInput {
    public static TableOutput toDTO(Table table){
        List<GroupOutput> groups = table.getGroups()!=null?table.getGroups().stream().map(GroupTableMapperInput::toDTO).toList():List.of();
        return TableOutput.builder()
                .id(table.getId())
                .name(table.getName())
                .numberOfPeople(table.getNumberOfPeople())
                .status(table.getStatus())
                .note(table.getNote())
                .groups(groups)
                .isBusy(table.isBusy())
                .build();
    }
    public static String toTableID(Table table){
        return table.getId();
    }
    public static Table toDomain(String tableID){
        return Table.builder()
                .id(tableID)
                .build();
    }
    public static Table toDomain(TableInput tableInput) {
        List<GroupTable> groups = tableInput.groups()!=null?tableInput.groups().stream().map(GroupTableMapperInput::toDomain).toList():List.of();
        return Table.builder()
                .name(tableInput.name())
                .status(tableInput.status())
                .note(tableInput.note())
                .numberOfPeople(tableInput.numberOfPeople())
                .groups(groups)
                .build();
    }
}
