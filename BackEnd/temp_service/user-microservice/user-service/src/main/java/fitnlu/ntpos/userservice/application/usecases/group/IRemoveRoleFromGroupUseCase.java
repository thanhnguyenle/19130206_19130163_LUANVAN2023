package fitnlu.ntpos.userservice.application.usecases.group;

import java.util.List;

public interface IRemoveRoleFromGroupUseCase {
    boolean removeRoleFromGroup(List<String> roles, String groupID);
}
