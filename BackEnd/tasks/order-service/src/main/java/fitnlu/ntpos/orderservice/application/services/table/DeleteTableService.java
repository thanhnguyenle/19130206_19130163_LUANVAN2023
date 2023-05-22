package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.usecases.table.ICreateTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteTableUseCase;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public class DeleteTableService implements IDeleteTableUseCase {

    @Override
    public List<Table> deleteTable(String id) {
        return null;
    }
}
