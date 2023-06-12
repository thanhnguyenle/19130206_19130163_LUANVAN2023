package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;

public interface IFindGroupTableUseCase {
    GroupTable findGroupTable(String groupTableID);
}
