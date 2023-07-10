package fitnlu.ntpos.userservice.application.ports.output;

import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.Role;

import java.util.List;

public interface IWriteGroupPort {
    Group createGroupSync(Group group) ;
    Group deleteGroupSync(String name) ;
    Group updateGroupSync(String name, Group group);

    boolean addUserToGroup(List<String> userIDs, String groupName);

    boolean removeUserFromGroup(List<String> userIDs, String groupName);
    boolean addRoleToGroup(List<String> roleNames, String groupName);
    boolean removeRoleFromGroup(List<String> roleNames, String groupName);
}
