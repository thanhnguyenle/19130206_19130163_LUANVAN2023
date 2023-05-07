package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.application.ports.output.IReadRolePort;
import fitnlu.ntpos.authservice.application.usecases.IFindAllRoleUseCase;
import fitnlu.ntpos.authservice.application.usecases.IFindRoleUseCase;
import fitnlu.ntpos.authservice.domain.model.Role;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FindRoleService implements IFindRoleUseCase, IFindAllRoleUseCase {
    private final IReadRolePort iReadRolePort;

    @Override
    public List<Role> findAllSync() {
        return iReadRolePort.findAllSync();
    }

    @Override
    public Role findByNameSync(String name) {
        return iReadRolePort.findByNameSync(name);
    }
}
