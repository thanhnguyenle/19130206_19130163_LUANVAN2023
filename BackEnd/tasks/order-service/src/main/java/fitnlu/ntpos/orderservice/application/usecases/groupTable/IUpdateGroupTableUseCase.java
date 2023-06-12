package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;

public interface IUpdateGroupTableUseCase {
    GroupTable updateGroupTable(String groupID, GroupTable groupTable);
}
