package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteTablePort;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteTableService implements IDeleteTableUseCase {
    private final IWriteTablePort writeTablePort;
    @Override
    public Table deleteTable(String id) {
        return writeTablePort.deleteTable(id);
    }
}
