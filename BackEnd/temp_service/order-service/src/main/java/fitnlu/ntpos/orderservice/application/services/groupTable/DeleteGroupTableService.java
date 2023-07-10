package fitnlu.ntpos.orderservice.application.services.groupTable;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteGroupTablePort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IDeleteGroupTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteGroupTableService implements IDeleteGroupTableUseCase {
    private final IWriteGroupTablePort writeGroupTablePort;
    @Override
    public GroupTable deleteGroupTable(String groupTableID) {
        return writeGroupTablePort.deleteGroupTable(groupTableID);
    }
}
