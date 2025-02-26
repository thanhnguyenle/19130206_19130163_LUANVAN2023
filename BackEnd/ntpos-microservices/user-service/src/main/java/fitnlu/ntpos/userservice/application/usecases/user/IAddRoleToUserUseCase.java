package fitnlu.ntpos.userservice.application.usecases.user;

import java.util.List;

public interface IAddRoleToUserUseCase {
    boolean addRoleToUser(String username, List<String> roleName);
}
