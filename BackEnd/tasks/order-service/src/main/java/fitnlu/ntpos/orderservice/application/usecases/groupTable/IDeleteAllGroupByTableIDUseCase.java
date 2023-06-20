package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;

public interface IDeleteAllGroupByTableIDUseCase {
    Table updateTable(String id,Table table);
}
