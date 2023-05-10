package fitnlu.ntpos.userservice.application.services;

import fitnlu.ntpos.userservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.userservice.application.usecases.ISubmitNewUserUseCase;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SubmitNewUserService implements ISubmitNewUserUseCase {
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
