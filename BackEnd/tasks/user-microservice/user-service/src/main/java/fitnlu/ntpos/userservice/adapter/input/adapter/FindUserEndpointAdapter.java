package fitnlu.ntpos.userservice.adapter.input.adapter;

import fitnlu.ntpos.userservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.userservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.userservice.application.ports.input.IFindUserEndpointPort;
import fitnlu.ntpos.userservice.application.usecases.user.IFindAllUserByGroupIDUseCase;
import fitnlu.ntpos.userservice.application.usecases.user.IFindAllUserByGroupNameUseCase;
import fitnlu.ntpos.userservice.application.usecases.user.IFindAllUserUseCase;
import fitnlu.ntpos.userservice.application.usecases.user.IFindUserUseCase;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Adapter
@AllArgsConstructor
public class FindUserEndpointAdapter implements IFindUserEndpointPort {
    private final IFindUserUseCase iFindUserUseCase;
    private final IFindAllUserUseCase iFindAllUserUseCase;
    private final UserMapperInput userMapperInput;
    private final IFindAllUserByGroupNameUseCase iFindAllUserByGroupNameUseCase;
    private final IFindAllUserByGroupIDUseCase iFindAllUserByGroupIDUseCase;
    @Override
    public CollectionReactive<UserOutput> findALL() {
        return iFindAllUserUseCase.findAll().map(UserMapperInput::toDTO);
    }

    @Override
    public List<UserOutput> findAllSync() {
        return iFindAllUserUseCase.findAllSync().stream().map(UserMapperInput::toDTO).collect(Collectors.toList());
    }

    @Override
    public UnitReactive<UserOutput> findById(String id) {
        return iFindUserUseCase.findById(id).map(UserMapperInput::toDTO);
    }

    @Override
    public UserOutput findByIdSync(String id) {
        return UserMapperInput.toDTO(iFindUserUseCase.findByIdSync(id));
    }

    @Override
    public List<UserOutput> findUserByGroupName(String groupName) {
        return iFindAllUserByGroupNameUseCase.findAllUserByGroupName(groupName).stream().map(UserMapperInput::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserOutput> findUserByGroupID(String groupID) {
        return iFindAllUserByGroupIDUseCase.findAllUserByGroupID(groupID).stream().map(UserMapperInput::toDTO).collect(Collectors.toList());
    }
}
