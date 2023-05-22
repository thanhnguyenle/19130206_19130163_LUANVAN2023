package fitnlu.ntpos.userservice.adapter.input.adapter;

import fitnlu.ntpos.userservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.userservice.adapter.input.mapper.GroupMapperInput;
import fitnlu.ntpos.userservice.application.ports.input.IFindGroupEndpointPort;
import fitnlu.ntpos.userservice.application.usecases.group.IFindAllGroupUseCase;
import fitnlu.ntpos.userservice.application.usecases.group.IFindGroupByUserIDUseCase;
import fitnlu.ntpos.userservice.application.usecases.group.IFindGroupUseCase;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.AllArgsConstructor;

import java.util.List;
@Adapter
@AllArgsConstructor
public class FindGroupEndpointAdapter implements IFindGroupEndpointPort {
    private final IFindAllGroupUseCase iFindAllGroupUseCase;
    private final IFindGroupUseCase iFindGroupUseCase;
    private final IFindGroupByUserIDUseCase iFindGroupByUserIDUseCase;

    @Override
    public List<GroupOutput> findAllSync() {
        return iFindAllGroupUseCase.findAllSync().stream().map(GroupMapperInput::toDTO).collect(java.util.stream.Collectors.toList());
    }

    @Override
    public GroupOutput findByNameSync(String name) {
        return GroupMapperInput.toDTO(iFindGroupUseCase.findGroup(name));
    }

    @Override
    public GroupOutput findGroup(String id) {
        return GroupMapperInput.toDTO(iFindGroupUseCase.findGroupByID(id));
    }

    @Override
    public List<GroupOutput> findByUserID(String id) {
        return iFindGroupByUserIDUseCase.findGroupByUserID(id).stream().map(GroupMapperInput::toDTO).collect(java.util.stream.Collectors.toList());
    }
}
