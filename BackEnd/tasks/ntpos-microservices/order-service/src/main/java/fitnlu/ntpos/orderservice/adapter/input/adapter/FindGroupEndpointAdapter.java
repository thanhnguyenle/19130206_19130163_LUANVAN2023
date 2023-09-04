package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.GroupTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.GroupTableRepository;
import fitnlu.ntpos.orderservice.application.ports.input.IFindGroupEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindAllGroupTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindGroupTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindAllTableByGroupIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindAllTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.ITableIsBusyUseCase;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class FindGroupEndpointAdapter implements IFindGroupEndpointPort {
    private final IFindGroupTableUseCase findGroupTableUseCase;
    private final IFindAllGroupTableUseCase findAllGroupTableUseCase;
    private final IFindAllTableByGroupIDUseCase findAllTableByGroupIDUseCase;
    private final ITableIsBusyUseCase tableIsBusyUseCase;
    @Override
    public GroupOutput findGroupTable(String groupTableID) {
        GroupTable groupTable = findGroupTableUseCase.findGroupTable(groupTableID);
        List<Table> listTable = findAllTableByGroupIDUseCase.findAllTableByGroupID(groupTableID).stream().toList();
        listTable.forEach(table -> {
            long startTime = System.currentTimeMillis()/1000;
            System.out.println(startTime);
            table.setBusy(tableIsBusyUseCase.isBusyTable(table.getId(),startTime,startTime));
        });
        groupTable.setTables(listTable);

        return GroupTableMapperInput.toDTO(groupTable);
    }

    @Override
    public List<GroupOutput> findAllGroupTable() {
        return findAllGroupTableUseCase.findAllGroupTable().stream().map(group ->{
            List<Table> listTable = findAllTableByGroupIDUseCase.findAllTableByGroupID(group.getId()).stream().toList();
            listTable.forEach(table -> {
                long startTime = System.currentTimeMillis()/1000;
                table.setBusy(tableIsBusyUseCase.isBusyTable(table.getId(),startTime,startTime));
            });
            group.setTables(listTable);
            return GroupTableMapperInput.toDTO(group);
        }).toList();
    }

    @Override
    public List<GroupOutput> findAllGroupTableByTimeStamp(long startTime, long endTime) {
        return findAllGroupTableUseCase.findAllGroupTable().stream().map(group ->{
            List<Table> listTable = findAllTableByGroupIDUseCase.findAllTableByGroupID(group.getId()).stream().toList();
            listTable.forEach(table -> {
                table.setBusy(tableIsBusyUseCase.isBusyTable(table.getId(),startTime,endTime));
            });
            group.setTables(listTable);
            return GroupTableMapperInput.toDTO(group);
        }).toList();
    };

    @Override
    public List<GroupOutput> findAllGroupTableByTableID(String tableID) {
        return findAllGroupTableUseCase.findAllGroupTableByTableID(tableID).stream().map(group->{
            List<Table> listTable = findAllTableByGroupIDUseCase.findAllTableByGroupID(group.getId()).stream().toList();
            listTable.forEach(table -> {
                long startTime = System.currentTimeMillis()/1000;
                System.out.println(startTime);
                table.setBusy(tableIsBusyUseCase.isBusyTable(table.getId(),startTime,startTime));
            });
            group.setTables(listTable);
            return GroupTableMapperInput.toDTO(group);
        }).toList();
    }
}
