package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.authservice.application.usecases.IUpdateUserUseCase;
import fitnlu.ntpos.authservice.domain.model.User;
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
