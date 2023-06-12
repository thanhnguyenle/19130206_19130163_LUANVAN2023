package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public interface IAddTableToGroupUseCase {
    boolean addTableToGroup(String groupID, List<String> tableIDs);
}
