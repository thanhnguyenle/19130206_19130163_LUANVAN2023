package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.authservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.authservice.application.usecases.ISubmitNewRoleUseCase;
import fitnlu.ntpos.authservice.application.usecases.ISubmitNewUserUseCase;
import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SubmitNewRoleService implements ISubmitNewRoleUseCase {
    private final IWriteRolePort iWriteRolePort;

    @Override
    public Role saveNewSync(Role role) {
        return iWriteRolePort.createRoleSync(role);
    }
}
