package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public interface IFindAllEmptyTableUseCase {
    List<Table> findAllEmptyTable();
}
