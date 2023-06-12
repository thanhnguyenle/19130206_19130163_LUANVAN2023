package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public interface IWriteGroupTablePort {
    GroupTable createGroupTable(GroupTable groupTable);
    GroupTable deleteGroupTable(String groupTableID);
    GroupTable updateGroupTable(String groupTableID, GroupTable groupTable);
    boolean addTableToGroup(String groupID, List<String> tableIDs);
    boolean removeTableFromGroup(String groupID, List<String> tablesIDs);
}
