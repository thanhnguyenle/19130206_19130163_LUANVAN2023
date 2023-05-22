package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.authservice.application.usecases.IUpdateRoleUseCase;
import fitnlu.ntpos.authservice.domain.model.Role;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UpdateRoleService implements IUpdateRoleUseCase {
    private final IWriteRolePort iWriteRolePort;
    @Override
    public Role updateRole(String name, Role role) {
        return iWriteRolePort.updateRoleSync(name, role);
    }
}
