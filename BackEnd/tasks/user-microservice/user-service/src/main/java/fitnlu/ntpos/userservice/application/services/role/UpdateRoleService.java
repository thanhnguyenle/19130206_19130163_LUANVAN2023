package fitnlu.ntpos.userservice.application.services.role;

import fitnlu.ntpos.userservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.userservice.application.usecases.role.IUpdateRoleUseCase;
import fitnlu.ntpos.userservice.domain.model.Role;
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
