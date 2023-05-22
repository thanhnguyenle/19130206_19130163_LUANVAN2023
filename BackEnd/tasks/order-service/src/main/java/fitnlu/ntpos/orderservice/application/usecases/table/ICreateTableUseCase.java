package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;

public interface ICreateTableUseCase {
    Table createTable(Table table);
}
