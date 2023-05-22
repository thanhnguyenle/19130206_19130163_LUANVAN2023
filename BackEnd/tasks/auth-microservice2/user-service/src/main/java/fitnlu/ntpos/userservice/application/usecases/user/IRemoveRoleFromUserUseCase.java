package fitnlu.ntpos.userservice.application.usecases.user;

import java.util.List;

public interface IRemoveRoleFromUserUseCase {
    boolean removeRoleToUser(String username,  List<String> roleName);
}
