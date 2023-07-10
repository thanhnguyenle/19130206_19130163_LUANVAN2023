package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteTablePort;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteAllTableFromOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteTableService implements IDeleteTableUseCase, IDeleteAllTableFromOrderUseCase {
    private final IWriteTablePort writeTablePort;
    @Override
    public Table deleteTable(String id) {
        return writeTablePort.deleteTable(id);
    }

    @Override
    public boolean deleteAllTableFromOrder(String orderID) {
        return writeTablePort.deleteAllTableFromOrder(orderID);
    }
}
