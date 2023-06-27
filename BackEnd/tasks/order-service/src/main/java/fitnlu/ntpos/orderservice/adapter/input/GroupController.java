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
    public GroupOutput findGroup(@Argument("groupID")  String groupID) {
        return findGroupEndpointAdapter.findGroupTable(groupID);
    }

    @QueryMapping("findAllGroup")
    public List<GroupOutput> findAllGroup() {
        return findGroupEndpointAdapter.findAllGroupTable();
    }

    //Mutation
    @MutationMapping("createGroup")
    public GroupOutput createGroup(@Argument("groupID")GroupInput groupInput) {
        return changeGroupEndpointAdapter.createGroupTable(groupInput);
    }

    @MutationMapping("updateGroup")
    public GroupOutput updateGroup(@Argument("groupID") String groupID, @Argument("groupID") GroupInput groupInput) {
        return changeGroupEndpointAdapter.updateGroupTable(groupID, groupInput);
    }

    @MutationMapping("deleteGroup")
    public GroupOutput deleteGroup(@Argument("groupID") String groupID) {
        return changeGroupEndpointAdapter.deleteGroupTable(groupID);
    }
}
