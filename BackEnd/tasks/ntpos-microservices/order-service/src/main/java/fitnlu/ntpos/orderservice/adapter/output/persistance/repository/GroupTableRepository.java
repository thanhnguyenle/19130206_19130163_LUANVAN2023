package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.GroupTableEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class  GroupTableRepository implements IGroupTableDBIRepository {
    private static final String GET_LIST = "select * from `group`";
    private static final String CREATE = "INSERT INTO `group` VALUES (:id, :name,:status,:note)";
    private static final String DELETE = "DELETE FROM `group` WHERE id = :id";
    private static final String GET_TABLE_BY_ID = "SELECT * FROM `group` WHERE id = :id";
    private static final String UPDATE = "UPDATE `group` SET name =:name, status =:status, note =:note WHERE id =:id";
    private static final String ADD_TABLE_TO_GROUP = "INSERT INTO `group_table` VALUES (:tableID, :groupID)";
    private static final String REMOVE_TABLE_FROM_GROUP = "DELETE FROM `group_table` WHERE groupID = :groupID AND tableID = :tableID";
    private static final String GET_GROUP_BY_TABLEID = "SELECT * FROM `group` WHERE id IN (SELECT groupID FROM `group_table` WHERE tableID =:tableID)";
    @NonNull
    private final Jdbi jdbi;
    private static final String DELETE_ALL_GROUP_BY_TABLEID = "DELETE FROM `group_table` WHERE tableID = :tableID";

    @Override
    public GroupTableEntities findGroupTable(String groupTableID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_TABLE_BY_ID)
                .bind("id", groupTableID)
                .mapToBean(GroupTableEntities.class).one());
    }

    @Override
    public List<GroupTableEntities> findAllGroupTable() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(GroupTableEntities.class).list());
    }

    @Override
    public List<GroupTableEntities> findAllGroupTableByTableID(String tableID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_GROUP_BY_TABLEID)
                .bind("tableID", tableID)
                .mapToBean(GroupTableEntities.class).list());
    }

    @Override
    public GroupTableEntities createGroupTable(GroupTableEntities groupTable) {
        String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id", id)
                    .bind("name", groupTable.getName())
                    .bind("status", groupTable.getStatus())
                    .bind("note", groupTable.getNote())
                    .execute();
            groupTable.setId(id);
            return groupTable;
        });
    }

    @Override
    public GroupTableEntities deleteGroupTable(String groupTableID) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE)
                    .bind("id", groupTableID)
                    .execute();
            return GroupTableEntities.builder().id(groupTableID).build();
        });
    }

    @Override
    public GroupTableEntities updateGroupTable(String groupTableID, GroupTableEntities groupTable) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id", groupTableID)
                    .bind("name", groupTable.getName())
                    .bind("status", groupTable.getStatus())
                    .bind("note", groupTable.getNote())
                    .execute();
            groupTable.setId(groupTableID);
            return groupTable;
        });
    }

    @Override
    public boolean addTableToGroup(String groupID, List<String> tableIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(ADD_TABLE_TO_GROUP);
            tableIDs.forEach(tableID -> preparedBatch
                    .bind("groupID", groupID)
                    .bind("tableID", tableID)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean removeTableFromGroup(String groupID, List<String> tablesIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(REMOVE_TABLE_FROM_GROUP);
            tablesIDs.forEach(tableID -> preparedBatch
                    .bind("groupID", groupID)
                    .bind("tableID", tableID)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteAllGroupByTableID(String tableID) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE_ALL_GROUP_BY_TABLEID)
                .bind("tableID", tableID)
                .execute() > 0);
    }
}
