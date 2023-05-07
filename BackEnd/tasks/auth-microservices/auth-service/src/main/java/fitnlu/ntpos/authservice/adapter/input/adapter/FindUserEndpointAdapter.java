package fitnlu.ntpos.authservice.adapter.input.adapter;

import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.authservice.application.ports.input.IFindUserEndpointPort;
import fitnlu.ntpos.authservice.application.usecases.IFindAllUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.IFindUserUseCase;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Adapter
@AllArgsConstructor
public class FindUserEndpointAdapter implements IFindUserEndpointPort {
    private final IFindUserUseCase iFindUserUseCase;
    private final IFindAllUserUseCase iFindAllUserUseCase;
    private final UserMapperInput userMapperInput;
    @Override
    public CollectionReactive<UserOutput> findALL() {
        return iFindAllUserUseCase.findAll().map(userMapperInput::toDTO);
    }

    @Override
    public List<UserOutput> findAllSync() {
        return iFindAllUserUseCase.findAllSync().stream().map(userMapperInput::toDTO).collect(Collectors.toList());
    }

    @Override
    public UnitReactive<UserOutput> findById(String id) {
        return iFindUserUseCase.findById(id).map(userMapperInput::toDTO);
    }

    @Override
    public UserOutput findByIdSync(String id) {
        return userMapperInput.toDTO(iFindUserUseCase.findByIdSync(id));
    }
}
