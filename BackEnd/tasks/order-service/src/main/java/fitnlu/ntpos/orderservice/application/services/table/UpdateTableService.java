package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteTablePort;
import fitnlu.ntpos.orderservice.application.usecases.table.IUpdateTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateTableService implements IUpdateTableUseCase {
    private final IWriteTablePort writeTablePort;
    @Override
    public Table updateTable(Table table) {
        return writeTablePort.updateTable(table);
    }
}
