package fitnlu.ntpos.userservice.application.services.user;

import fitnlu.ntpos.userservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.userservice.application.usecases.user.*;
import fitnlu.ntpos.userservice.domain.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UpdateUserService implements IUpdateUserUseCase, IAddRoleToUserUseCase, IRemoveRoleFromUserUseCase, IUnlockUserUseCase, ILockUserUseCase {
    private final IWriteUserPort iWriteUserPort;

    @Override
    public User updateUser(String name, User user) {
        return iWriteUserPort.updateUserSync(name, user);
    }
    @Override
    public boolean addRoleToUser(String username, List<String> roleName) {
        return iWriteUserPort.addRoleToUser(username, roleName);
    }

    @Override
    public boolean removeRoleToUser(String username, List<String> roleName) {
        return iWriteUserPort.removeRoleFromUser(username, roleName);
    }

    @Override
    public boolean lockUser(String id) {
        return false;
    }

    @Override
    public boolean unlockUser(String id) {
        return false;
    }
}
