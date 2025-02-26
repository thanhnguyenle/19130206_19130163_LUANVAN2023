package fitnlu.ntpos.userservice.application.services.user;

import fitnlu.ntpos.userservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.userservice.application.usecases.user.ISubmitNewUserUseCase;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public boolean addBatchUsers(List<User> users) {
        return iWriteUserPort.addBatchUsers(users);
    }
}
