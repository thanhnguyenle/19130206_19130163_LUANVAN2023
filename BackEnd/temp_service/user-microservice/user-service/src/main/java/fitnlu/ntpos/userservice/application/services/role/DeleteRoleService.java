package fitnlu.ntpos.userservice.application.services.role;

import fitnlu.ntpos.userservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.userservice.application.usecases.role.IRemoveRoleUseCase;
import fitnlu.ntpos.userservice.domain.model.Role;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DeleteRoleService implements IRemoveRoleUseCase {
    private final IWriteRolePort iWriteRolePort;

    @Override
    public Role removeRole(String name) {
        return iWriteRolePort.deleteRoleSync(name);
    }
}
