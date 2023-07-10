package fitnlu.ntpos.orderservice.application.usecases.groupTable;

import java.util.List;

public interface IRemoveTableFromGroupUseCase {
    boolean removeTableFromGroup(String groupID, List<String> tableIDs);
}
