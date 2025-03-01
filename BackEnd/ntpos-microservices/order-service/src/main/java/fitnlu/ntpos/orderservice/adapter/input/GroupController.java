package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.ChangeGroupEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.adapter.FindGroupEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.dto.GroupInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GroupController {
    private final ChangeGroupEndpointAdapter changeGroupEndpointAdapter;
    private final FindGroupEndpointAdapter findGroupEndpointAdapter;

    //Query
    @QueryMapping("findGroup")
    public GroupOutput findGroup(@Argument("id")  String groupID) {
        return findGroupEndpointAdapter.findGroupTable(groupID);
    }

    @QueryMapping("findAllGroup")
    public List<GroupOutput> findAllGroup() {
        return findGroupEndpointAdapter.findAllGroupTable();
    }

    @QueryMapping("findAllGroupTableByTimeStamp")
    public List<GroupOutput> findAllGroupTableByTimeStamp(@Argument long startTime, @Argument long endTime) {
        return findGroupEndpointAdapter.findAllGroupTableByTimeStamp(startTime,endTime);
    }
    //Mutation
    @MutationMapping("createGroup")
    public GroupOutput createGroup(@Argument("groupInput")GroupInput groupInput) {
        return changeGroupEndpointAdapter.createGroupTable(groupInput);
    }

    @MutationMapping("updateGroup")
    public GroupOutput updateGroup(@Argument("id") String groupID, @Argument GroupInput groupInput) {
        return changeGroupEndpointAdapter.updateGroupTable(groupID, groupInput);
    }

    @MutationMapping("deleteGroup")
    public GroupOutput deleteGroup(@Argument("id") String groupID) {
        return changeGroupEndpointAdapter.deleteGroupTable(groupID);
    }
}
