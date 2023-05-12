package fitnlu.ntpos.userservice.adapter.input.adapter;

import fitnlu.ntpos.userservice.adapter.input.dto.GroupInput;
import fitnlu.ntpos.userservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.GroupScalarOutput;
import fitnlu.ntpos.userservice.adapter.input.mapper.GroupMapperInput;
import fitnlu.ntpos.userservice.application.ports.input.IChangeGroupEndpointPort;
import fitnlu.ntpos.userservice.application.usecases.group.*;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.AllArgsConstructor;

import java.util.List;

@Adapter
@AllArgsConstructor
public class ChangeGroupEndpointAdapter implements IChangeGroupEndpointPort {
    private final GroupMapperInput groupMapperInput;
    private final ISubmitNewGroupUseCase iSubmitNewGroupUseCase;
    private final IRemoveGroupUseCase iRemoveGroupUseCase;
    private final IUpdateGroupUseCase iUpdateGroupUseCase;
    private final IAddUserToGroupUseCase iAddUserToGroupUseCase;
    private final IAddRoleToGroupUseCase iAddRoleToGroupUseCase;
    private final IRemoveRoleFromGroupUseCase iRemoveRoleFromGroupUseCase;
    private final IRemoveUserFromGroupUseCase iRemoveUserFromGroupUseCase;

    @Override
    public GroupOutput createGroupSync(GroupInput group) {
        return groupMapperInput.toDTO(iSubmitNewGroupUseCase.submitNewGroup(groupMapperInput.toDomainFromSaveBody(group)));
    }

    @Override
    public GroupOutput deleteGroupSync(String name) {
        return groupMapperInput.toDTO(iRemoveGroupUseCase.removeGroup(name));
    }

    @Override
    public GroupOutput updateGroupSync(String name, GroupInput group) {
        return groupMapperInput.toDTO(iUpdateGroupUseCase.updateGroup(name, groupMapperInput.toDomainFromSaveBody(group)));
    }

    @Override
    public GroupScalarOutput addUserToGroup(List<String> id, String groupName) {
        return groupMapperInput.toDTO(iAddUserToGroupUseCase.addUserToGroup(id, groupName));
    }

    @Override
    public GroupScalarOutput removeUserFromGroup(List<String> userID, String groupName) {
        return groupMapperInput.toDTO(iRemoveUserFromGroupUseCase.removeUserFromGroup(userID, groupName));
    }

    @Override
    public GroupScalarOutput addRoleToGroup(List<String> roleName, String groupName) {
        return groupMapperInput.toDTO(iAddRoleToGroupUseCase.addRoleToGroup(roleName, groupName));
    }

    @Override
    public GroupScalarOutput removeRoleFromGroup(List<String> roleName, String groupName) {
        return groupMapperInput.toDTO(iRemoveRoleFromGroupUseCase.removeRoleFromGroup(roleName, groupName));
    }
}
