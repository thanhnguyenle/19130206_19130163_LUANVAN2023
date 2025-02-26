package fitnlu.ntpos.orderservice.application.services.groupTable;

import fitnlu.ntpos.orderservice.application.ports.output.IReadGroupTablePort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindAllGroupTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindGroupTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IRemoveTableFromGroupUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindAllTableByGroupIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindGroupTableService implements IFindGroupTableUseCase, IFindAllGroupTableUseCase {
    private final IReadGroupTablePort readGroupTablePort;
    @Override
    public GroupTable findGroupTable(String groupTableID) {
        return readGroupTablePort.findGroupTable(groupTableID);
    }

    @Override
    public List<GroupTable> findAllGroupTable() {
        return readGroupTablePort.findAllGroupTable();
    }

    @Override
    public List<GroupTable> findAllGroupTableByTableID(String tableID) {
        return readGroupTablePort.findAllGroupTableByTableID(tableID);
    }

}
