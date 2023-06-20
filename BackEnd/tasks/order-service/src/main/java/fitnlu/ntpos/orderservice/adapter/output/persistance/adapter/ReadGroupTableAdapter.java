package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.GroupTableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IGroupTableDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IReadGroupTablePort;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
@Adapter
public class ReadGroupTableAdapter implements IReadGroupTablePort {
    private final IGroupTableDBIRepository iReadGroupTablePort;
    @Override
    public GroupTable findGroupTable(String groupTableID) {
        return GroupTableMapperOutput.toDomain(iReadGroupTablePort.findGroupTable(groupTableID));
    }

    @Override
    public List<GroupTable> findAllGroupTable() {
        return iReadGroupTablePort.findAllGroupTable().stream().map(GroupTableMapperOutput::toDomain).toList();
    }

    @Override
    public List<GroupTable> findAllGroupTableByTableID(String tableID) {
        return iReadGroupTablePort.findAllGroupTableByTableID(tableID).stream().map(GroupTableMapperOutput::toDomain).toList();
    }
}
