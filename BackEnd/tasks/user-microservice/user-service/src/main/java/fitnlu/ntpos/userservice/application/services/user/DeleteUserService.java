package fitnlu.ntpos.userservice.application.services;
import fitnlu.ntpos.userservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.userservice.application.usecases.IRemoveUserUseCase;
import fitnlu.ntpos.userservice.domain.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DeleteUserService implements IRemoveUserUseCase {
    private final IWriteUserPort iWriteUserPort;

    @Override
    public User removeUser(String id) {
        return iWriteUserPort.deleteUserSync(id);
    }
}
