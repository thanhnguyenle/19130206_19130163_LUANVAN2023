package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.authservice.application.usecases.ISubmitNewUserUseCase;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SubmitNewRoleService implements ISubmitNewUserUseCase {
    private final IWriteUserPort iWriteUserPort;

    @Override
    public UnitReactive<User> saveNew(User user) {
      return iWriteUserPort.saveNew(user);
    }

    @Override
    public User saveNewSync(User user)  {
        return iWriteUserPort.saveNewSync(user);
    }
}
