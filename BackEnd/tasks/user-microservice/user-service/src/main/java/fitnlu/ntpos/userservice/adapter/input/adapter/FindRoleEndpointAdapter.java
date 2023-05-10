package fitnlu.ntpos.userservice.adapter.input.adapter;

import fitnlu.ntpos.userservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.userservice.adapter.input.mapper.RoleMapperInput;
import fitnlu.ntpos.userservice.application.ports.input.IFindRoleEndpointPort;
import fitnlu.ntpos.userservice.application.usecases.role.IFindAllRoleOfGroupIDUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.IFindAllRoleUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.IFindRoleByGroupNameUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.IFindRoleUseCase;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Adapter
@AllArgsConstructor
public class FindRoleEndpointAdapter implements IFindRoleEndpointPort {
    private final IFindRoleUseCase iFindRoleUseCase;
    private final IFindAllRoleUseCase iFindAllRoleUseCase;
    private final IFindRoleByGroupNameUseCase iFindRoleByGroupNameUseCase;
    private final IFindAllRoleOfGroupIDUseCase iFindAllRoleOfGroupIDUseCase;
    @Override
    public List<RoleOutput> findAllSync() {
        return iFindAllRoleUseCase.findAllSync().stream().map(RoleMapperInput::toDTO).collect(Collectors.toList());
    }

    @Override
    public RoleOutput findByNameSync(String name) {
        return RoleMapperInput.toDTO(iFindRoleUseCase.findByNameSync(name));
    }

    @Override
    public List<RoleOutput> findByUserID(String id) {
        return iFindRoleUseCase.findByUserID(id).stream().map(RoleMapperInput::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<RoleOutput> findRoleOfGroupName(String name) {
        return iFindRoleByGroupNameUseCase.findRoleByGroupName(name).stream().map(RoleMapperInput::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<RoleOutput> findRoleOfGroupID(String id) {
        return iFindAllRoleOfGroupIDUseCase.findAllRoleOfGroupID(id).stream().map(RoleMapperInput::toDTO).toList();
    }
}
