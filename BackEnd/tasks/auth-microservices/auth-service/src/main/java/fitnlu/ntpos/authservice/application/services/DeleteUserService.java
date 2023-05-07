package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.authservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.authservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.authservice.application.usecases.IFindAllUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.IFindUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.IRemoveUserUseCase;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
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
