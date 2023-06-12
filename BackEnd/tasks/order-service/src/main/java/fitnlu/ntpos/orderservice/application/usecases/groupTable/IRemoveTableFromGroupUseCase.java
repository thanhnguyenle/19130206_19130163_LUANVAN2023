package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import java.util.List;

public interface IRemoveTableToGroupUseCase {
    boolean removeTableFromGroup(String groupID, List<String> tableIDs);
}
