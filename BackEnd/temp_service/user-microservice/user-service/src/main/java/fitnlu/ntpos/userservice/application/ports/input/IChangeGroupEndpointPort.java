package fitnlu.ntpos.userservice.application.ports.input;

import fitnlu.ntpos.userservice.adapter.input.dto.GroupInput;
import fitnlu.ntpos.userservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.GroupScalarOutput;

import java.util.List;

public interface IChangeGroupEndpointPort {
    GroupOutput createGroupSync(GroupInput group) ;
    GroupOutput deleteGroupSync(String name) ;
    GroupOutput updateGroupSync(String name, GroupInput group);

    GroupScalarOutput addUserToGroup(List<String> id, String groupName);

    GroupScalarOutput removeUserFromGroup(List<String> userID, String groupName);
    GroupScalarOutput addRoleToGroup(List<String> roleName, String groupName);
    GroupScalarOutput removeRoleFromGroup(List<String> roleName, String groupName);
}
