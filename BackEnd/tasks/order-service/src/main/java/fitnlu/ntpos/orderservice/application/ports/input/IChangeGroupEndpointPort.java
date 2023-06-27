package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.ResultOutput;

import java.util.List;

public interface IChangeGroupEndpointPort {
    GroupOutput createGroupTable(GroupInput groupInput);
    GroupOutput deleteGroupTable(String groupTableID);
    GroupOutput updateGroupTable(String groupTableID, GroupInput groupInput);
    ResultOutput addTableToGroup(String groupID, List<String> tableIDs);
    ResultOutput removeTableFromGroup(String groupID, List<String> tablesIDs);
}
