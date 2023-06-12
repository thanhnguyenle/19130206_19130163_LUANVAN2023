package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderPort;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteTablePort;
import fitnlu.ntpos.orderservice.application.usecases.table.ICreateTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddTableService implements ICreateTableUseCase {
    private final IWriteTablePort writeTablePort;
    @Override
    public Table createTable(Table table) {
        return writeTablePort.createTable(table);
    }
}
