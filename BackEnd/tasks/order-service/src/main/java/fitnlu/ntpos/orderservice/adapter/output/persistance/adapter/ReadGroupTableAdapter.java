package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.application.ports.output.IReadGroupTablePort;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
@Adapter
public class ReadGroupTableAdapter implements IReadGroupTablePort {
    private final IReadGroupTablePort iReadGroupTablePort;
    @Override
    public GroupTable findGroupTable(String groupTableID) {
        return iReadGroupTablePort.findGroupTable(groupTableID);
    }

    @Override
    public List<GroupTable> findAllGroupTable() {
        return iReadGroupTablePort.findAllGroupTable();
    }
}
