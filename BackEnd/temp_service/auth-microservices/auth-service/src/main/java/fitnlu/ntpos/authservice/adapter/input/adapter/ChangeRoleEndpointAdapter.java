package fitnlu.ntpos.authservice.adapter.input.adapter;

import fitnlu.ntpos.authservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.authservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.adapter.input.mapper.RoleMapperInput;
import fitnlu.ntpos.authservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.authservice.application.ports.input.IChangeRoleEndpointPort;
import fitnlu.ntpos.authservice.application.ports.input.IChangeUserEndpointPort;
import fitnlu.ntpos.authservice.application.usecases.IRemoveRoleUseCase;
import fitnlu.ntpos.authservice.application.usecases.ISubmitNewRoleUseCase;
import fitnlu.ntpos.authservice.application.usecases.ISubmitNewUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.IUpdateRoleUseCase;
import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
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
