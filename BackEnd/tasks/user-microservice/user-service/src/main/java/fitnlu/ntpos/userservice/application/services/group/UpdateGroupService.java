package fitnlu.ntpos.userservice.application.services.group;

import fitnlu.ntpos.userservice.application.ports.output.IWriteGroupPort;
import fitnlu.ntpos.userservice.application.usecases.group.*;
import fitnlu.ntpos.userservice.domain.model.Group;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UpdateGroupService implements IUpdateGroupUseCase, IAddUserToGroupUseCase, IRemoveUserFromGroupUseCase,IAddRoleToGroupUseCase,IRemoveRoleFromGroupUseCase {
    private final IWriteGroupPort iWriteGroupPort;

    @Override
    public Group updateGroup(String name, Group group) {
        return iWriteGroupPort.updateGroupSync(name, group);
    }

    @Override
    public boolean addUserToGroup(List<String> userIDs, String groupID) {
        return iWriteGroupPort.addUserToGroup(userIDs, groupID);
    }

    @Override
    public boolean removeUserFromGroup(List<String> userIDs, String groupID) {
        return iWriteGroupPort.removeUserFromGroup(userIDs, groupID);
    }

    @Override
    public boolean addRoleToGroup(List<String> roleNames, String groupID) {
        return iWriteGroupPort.addRoleToGroup(roleNames, groupID);
    }

    @Override
    public boolean removeRoleFromGroup(List<String> roleNames, String groupID) {
        return iWriteGroupPort.removeRoleFromGroup(roleNames, groupID);
    }
}
