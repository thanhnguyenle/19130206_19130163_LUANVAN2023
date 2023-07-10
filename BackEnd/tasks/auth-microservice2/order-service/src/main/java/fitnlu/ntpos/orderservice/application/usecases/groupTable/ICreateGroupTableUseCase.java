package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;

public interface ICreateGroupTableUseCase {
    GroupTable createGroupTable(GroupTable groupTable);
}
