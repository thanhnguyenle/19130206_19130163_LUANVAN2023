package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.GroupTableEntities;
import java.util.List;

public interface IGroupTableDBIRepository {
    GroupTableEntities findGroupTable(String groupTableID);

    List<GroupTableEntities> findAllGroupTable();
    GroupTableEntities createGroupTable(GroupTableEntities groupTable);
    GroupTableEntities deleteGroupTable(String groupTableID);
    GroupTableEntities updateGroupTable(String groupTableID, GroupTableEntities groupTable);
    boolean addTableToGroup(String groupID, List<String> tableIDs);
    boolean removeTableFromGroup(String groupID, List<String> tablesIDs);
}
