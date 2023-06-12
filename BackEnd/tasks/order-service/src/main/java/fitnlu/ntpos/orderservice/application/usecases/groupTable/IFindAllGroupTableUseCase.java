package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;

import java.util.List;

public interface IFindAllGroupTableUseCase {
    List<GroupTable> findAllGroupTable();
}
