package fitnlu.ntpos.userservice.adapter.input.adapter;

import fitnlu.ntpos.userservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.userservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.userservice.adapter.input.mapper.RoleMapperInput;
import fitnlu.ntpos.userservice.application.ports.input.IChangeRoleEndpointPort;
import fitnlu.ntpos.userservice.application.usecases.role.IRemoveRoleUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.ISubmitNewRoleUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.IUpdateRoleUseCase;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.AllArgsConstructor;

@Adapter
@AllArgsConstructor
public class ChangeRoleEndpointAdapter implements IChangeRoleEndpointPort {
    private final RoleMapperInput roleMapperInput;
    private final ISubmitNewRoleUseCase iSubmitNewRoleUseCase;
    private final IRemoveRoleUseCase iRemoveRoleUseCase;
    private final IUpdateRoleUseCase iUpdateRoleUseCase;

    @Override
    public RoleOutput createRoleSync(RoleInput role) {
        Role r = iSubmitNewRoleUseCase.saveNewSync(roleMapperInput.toDomainFromSaveBody(role));
        return roleMapperInput.toDTO(r);
    }

    @Override
    public RoleOutput deleteRoleSync(String name) {
        Role r = iRemoveRoleUseCase.removeRole(name);
        return roleMapperInput.toDTO(r);
    }

    @Override
    public RoleOutput updateRoleSync(String name, RoleInput role) {
        Role r = iUpdateRoleUseCase.updateRole(name, roleMapperInput.toDomainFromSaveBody(role));
        return roleMapperInput.toDTO(r);
    }
}
