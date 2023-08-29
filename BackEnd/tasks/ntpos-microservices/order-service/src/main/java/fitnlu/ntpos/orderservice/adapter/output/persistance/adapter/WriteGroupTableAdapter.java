package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.GroupTableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IGroupTableDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteGroupTablePort;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class WriteGroupTableAdapter implements IWriteGroupTablePort {
    private final IGroupTableDBIRepository groupTableDBIRepository;
    @Override
    public GroupTable createGroupTable(GroupTable groupTable) {
        return GroupTableMapperOutput.toDomain(groupTableDBIRepository.createGroupTable(GroupTableMapperOutput.toEntities(groupTable)));
    }

    @Override
    public GroupTable deleteGroupTable(String groupTableID) {
        return GroupTableMapperOutput.toDomain(groupTableDBIRepository.deleteGroupTable(groupTableID));
    }

    @Override
    public GroupTable updateGroupTable(String groupTableID, GroupTable groupTable) {
        return GroupTableMapperOutput.toDomain(groupTableDBIRepository.updateGroupTable(groupTableID,GroupTableMapperOutput.toEntities(groupTable)));
    }

    @Override
    public boolean addTableToGroup(String groupID, List<String> tableIDs) {
        return groupTableDBIRepository.addTableToGroup(groupID,tableIDs);
    }

    @Override
    public boolean removeTableFromGroup(String groupID, List<String> tablesIDs) {
        return groupTableDBIRepository.removeTableFromGroup(groupID,tablesIDs);
    }

    @Override
    public boolean deleteAllGroupByTableID(String tableID) {
        return groupTableDBIRepository.deleteAllGroupByTableID(tableID);
    }
}
