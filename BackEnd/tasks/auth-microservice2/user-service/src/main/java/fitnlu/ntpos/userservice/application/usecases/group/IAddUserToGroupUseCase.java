package fitnlu.ntpos.userservice.application.usecases.group;

import java.util.List;

public interface IAddUserToGroupUseCase {
    boolean addUserToGroup(List<String> userIDs, String groupID);
}
