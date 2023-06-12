package fitnlu.ntpos.orderservice.application.services.groupTable;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteGroupTablePort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IAddTableToGroupUseCase;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IRemoveTableFromGroupUseCase;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IUpdateGroupTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UpdateGroupTableService implements IUpdateGroupTableUseCase, IAddTableToGroupUseCase, IRemoveTableFromGroupUseCase {
    private final IWriteGroupTablePort writeGroupTablePort;
    @Override
    public GroupTable updateGroupTable(String groupID, GroupTable groupTable) {
        return writeGroupTablePort.updateGroupTable(groupID, groupTable);
    }

    @Override
    public boolean addTableToGroup(String groupID, List<String> tableIDs) {
        return writeGroupTablePort.addTableToGroup(groupID, tableIDs);
    }

    @Override
    public boolean removeTableFromGroup(String groupID, List<String> tableIDs) {
        return writeGroupTablePort.removeTableFromGroup(groupID, tableIDs);
    }
}
