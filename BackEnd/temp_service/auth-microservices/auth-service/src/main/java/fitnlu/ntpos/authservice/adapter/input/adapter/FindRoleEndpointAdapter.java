package fitnlu.ntpos.authservice.adapter.input.adapter;

import fitnlu.ntpos.authservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.adapter.input.mapper.RoleMapperInput;
import fitnlu.ntpos.authservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.authservice.application.ports.input.IFindRoleEndpointPort;
import fitnlu.ntpos.authservice.application.ports.input.IFindUserEndpointPort;
import fitnlu.ntpos.authservice.application.usecases.IFindAllRoleUseCase;
import fitnlu.ntpos.authservice.application.usecases.IFindAllUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.IFindRoleUseCase;
import fitnlu.ntpos.authservice.application.usecases.IFindUserUseCase;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Adapter
@AllArgsConstructor
public class FindRoleEndpointAdapter implements IFindRoleEndpointPort{
    private final IFindRoleUseCase iFindRoleUseCase;
    private final IFindAllRoleUseCase iFindAllRoleUseCase;
    private final RoleMapperInput roleMapperInput;

    @Override
    public List<RoleOutput> findAllSync() {
        return iFindAllRoleUseCase.findAllSync().stream().map(roleMapperInput::toDTO).collect(Collectors.toList());
    }

    @Override
    public RoleOutput findByNameSync(String name) {
        return roleMapperInput.toDTO(iFindRoleUseCase.findByNameSync(name));
    }
}
