package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;

public interface IDeleteGroupTableUseCase {
    GroupTable deleteGroupTable(String groupTableID);
}
