package fitnlu.ntpos.userservice.application.usecases.group;

import java.util.List;

public interface IAddRoleToGroupUseCase {
    boolean addRoleToGroup(List<String> roles, String groupID);
}
