package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.GroupTableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IChangeGroupEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.*;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ChangeGroupEndpointAdapter implements IChangeGroupEndpointPort {
    private final ICreateGroupTableUseCase createGroupTableUseCase;
    private final IDeleteGroupTableUseCase deleteGroupTableUseCase;
    private final IUpdateGroupTableUseCase updateGroupTableUseCase;
    private final IAddTableToGroupUseCase addTableToGroupUseCase;
    private final IRemoveTableFromGroupUseCase removeTableFromGroupUseCase;
    @Override
    public GroupOutput createGroupTable(GroupInput groupInput) {
        return GroupTableMapperInput.toDTO(createGroupTableUseCase.createGroupTable(GroupTableMapperInput.toDomain(groupInput)));
    }

    @Override
    public GroupOutput deleteGroupTable(String groupTableID) {
        return GroupTableMapperInput.toDTO(deleteGroupTableUseCase.deleteGroupTable(groupTableID));
    }

    @Override
    public GroupOutput updateGroupTable(String groupTableID, GroupInput groupInput) {
        return GroupTableMapperInput.toDTO(updateGroupTableUseCase.updateGroupTable(groupTableID, GroupTableMapperInput.toDomain(groupInput)));
    }

    @Override
    public ResultOutput addTableToGroup(String groupID, List<String> tableIDs) {
        return ResultOutput.builder()
                .success(addTableToGroupUseCase.addTableToGroup(groupID, tableIDs))
                .build();
    }

    @Override
    public ResultOutput removeTableFromGroup(String groupID, List<String> tablesIDs) {
        return ResultOutput.builder()
                .success(removeTableFromGroupUseCase.removeTableFromGroup(groupID, tablesIDs))
                .build();
    }
}
