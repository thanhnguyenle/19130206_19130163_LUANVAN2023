package fitnlu.ntpos.orderservice.application.services.groupTable;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteGroupTablePort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.ICreateGroupTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddGroupTableService implements ICreateGroupTableUseCase {
    private final IWriteGroupTablePort writeGroupTablePort;
    @Override
    public GroupTable createGroupTable(GroupTable groupTable) {
        return writeGroupTablePort.createGroupTable(groupTable);
    }
}
