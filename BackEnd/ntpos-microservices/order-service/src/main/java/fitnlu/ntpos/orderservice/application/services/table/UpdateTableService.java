package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteTablePort;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteAllTableByGroupIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IUpdateStatusTable;
import fitnlu.ntpos.orderservice.application.usecases.table.IUpdateTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateTableService implements IUpdateTableUseCase, IDeleteAllTableByGroupIDUseCase
        , IUpdateStatusTable {
    private final IWriteTablePort writeTablePort;
    @Override
    public Table updateTable(String id, Table table) {
        return writeTablePort.updateTable(id, table);
    }

    @Override
    public boolean deleteAllTableByGroupID(String groupID) {
        return writeTablePort.deleteAllTableByGroupID(groupID);
    }

    @Override
    public boolean updateStatusTable(String id, String status) {
        return writeTablePort.updateStatusTable( id,  status);
    }
}
