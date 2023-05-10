package fitnlu.ntpos.userservice.application.services;

import fitnlu.ntpos.userservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.userservice.application.usecases.ISubmitNewRoleUseCase;
import fitnlu.ntpos.userservice.domain.model.Role;
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
