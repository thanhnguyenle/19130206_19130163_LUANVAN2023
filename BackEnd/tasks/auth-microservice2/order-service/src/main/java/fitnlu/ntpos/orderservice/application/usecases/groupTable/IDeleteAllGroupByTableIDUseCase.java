package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import fitnlu.ntpos.orderservice.domain.model.Table;

public interface IDeleteAllGroupByTableIDUseCase {
    boolean deleteAllGroupByTableID(String tableID);
}
