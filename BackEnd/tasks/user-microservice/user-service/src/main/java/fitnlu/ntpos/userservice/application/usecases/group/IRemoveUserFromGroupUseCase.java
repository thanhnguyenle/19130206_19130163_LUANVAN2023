package fitnlu.ntpos.userservice.application.usecases.group;

import java.util.List;

public interface IRemoveUserFromGroupUseCase {
    boolean removeUserFromGroup(List<String> userIDs, String groupID);
}
