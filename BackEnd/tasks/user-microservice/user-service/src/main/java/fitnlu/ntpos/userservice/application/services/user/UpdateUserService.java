package fitnlu.ntpos.userservice.application.services;

import fitnlu.ntpos.userservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.userservice.application.usecases.IUpdateUserUseCase;
import fitnlu.ntpos.userservice.domain.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UpdateUserService implements IUpdateUserUseCase {
    private final IWriteUserPort iWriteUserPort;

    @Override
    public User updateUser(String name, User user) {
        return iWriteUserPort.updateUserSync(name, user);
    }
}
