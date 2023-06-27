package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.GroupTableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IFindGroupEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindAllGroupTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindGroupTableUseCase;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class FindGroupEndpointAdapter implements IFindGroupEndpointPort {
    private final IFindGroupTableUseCase findGroupTableUseCase;
    private final IFindAllGroupTableUseCase findAllGroupTableUseCase;
    @Override
    public GroupOutput findGroupTable(String groupTableID) {
        return GroupTableMapperInput.toDTO(findGroupTableUseCase.findGroupTable(groupTableID));
    }

    @Override
    public List<GroupOutput> findAllGroupTable() {
        return findAllGroupTableUseCase.findAllGroupTable().stream().map(GroupTableMapperInput::toDTO).toList();
    }
}
