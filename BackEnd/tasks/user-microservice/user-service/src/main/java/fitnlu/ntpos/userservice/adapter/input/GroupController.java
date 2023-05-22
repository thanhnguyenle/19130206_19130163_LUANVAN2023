package fitnlu.ntpos.userservice.adapter.input;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import fitnlu.ntpos.userservice.adapter.input.adapter.ChangeGroupEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindGroupEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindRoleEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindUserEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.dto.*;
import fitnlu.ntpos.userservice.adapter.input.until.CursorUntil;
import graphql.relay.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.Nullable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class GroupController implements GraphQLQueryResolver, GraphQLMutationResolver {
    private final FindGroupEndpointAdapter findGroupEndpointAdapter;
    private final ChangeGroupEndpointAdapter changeGroupEndpointAdapter;
    private final CursorUntil cursorUntil;

    //Mutation
    @SchemaMapping(typeName = "Mutation", field = "createGroup")
    public GroupOutput createGroup(@Argument("groupInput") @Valid GroupInput groupInput){
        return changeGroupEndpointAdapter.createGroupSync(groupInput);
    }
    @SchemaMapping(typeName = "Mutation", field = "updateGroup")
    public GroupOutput updateGroup(@Argument  String id, @Argument("groupInput") @Valid GroupInput groupInput){
        return changeGroupEndpointAdapter.updateGroupSync(id,groupInput);
    }
    @SchemaMapping(typeName = "Mutation", field = "deleteGroup")
    public GroupOutput deleteGroup(@Argument  String id){
        return changeGroupEndpointAdapter.deleteGroupSync(id);
    }
    @SchemaMapping(typeName = "Mutation", field = "addUserToGroup")
    public GroupScalarOutput addUserToGroup(@Argument  List<String> userIDs, @Argument  String groupID){
        return changeGroupEndpointAdapter.addUserToGroup(userIDs,groupID);
    }
    @SchemaMapping(typeName = "Mutation", field = "removeUserFromGroup")
    public GroupScalarOutput removeUserFromGroup(@Argument  List<String> userIDs, @Argument String groupID){
        return changeGroupEndpointAdapter.removeUserFromGroup(userIDs,groupID);
    }
    @SchemaMapping(typeName = "Mutation", field = "addRoleToGroup")
    public GroupScalarOutput addRoleToGroup(@Argument  List<String> roleNames, @Argument String groupID){
        return changeGroupEndpointAdapter.addRoleToGroup(roleNames,groupID);
    }
    @SchemaMapping(typeName = "Mutation", field = "removeRoleFromGroup")
    public GroupScalarOutput removeRoleFromGroup(@Argument  List<String> roleNames, @Argument String groupID){
        return changeGroupEndpointAdapter.removeRoleFromGroup(roleNames,groupID);
    }

    //Query
    @SchemaMapping(typeName = "Query", field = "groups")
    public List<GroupOutput> getALlGroups(){
        return findGroupEndpointAdapter.findAllSync();
    }

    @SchemaMapping(typeName = "Query", field = "groupsPaging")
    public Connection<GroupOutput> getAllGroupsPaging(@Argument int first, @Argument @Nullable String cursor) {
        List<Edge<GroupOutput>> edges =findGroupEndpointAdapter.findAllSync()
                .stream()
                .map(user -> new DefaultEdge<>(user,
                        cursorUntil.createCursorWith(UUID.fromString(user.getId()))))
                .limit(first)
                .collect(Collectors.toUnmodifiableList());

        var pageInfo = new DefaultPageInfo(
                cursorUntil.getFirstCursorFrom(edges),
                cursorUntil.getLastCursorFrom(edges),
                cursor != null,
                edges.size() >= first);

        return new DefaultConnection<>(edges, pageInfo);
    }

    @SchemaMapping(typeName = "Query", field = "groupByName")
    public GroupOutput getRoleByName(@Argument  String name){
        return findGroupEndpointAdapter.findByNameSync(name);
    }
    @SchemaMapping(typeName = "Query", field = "group")
    public GroupOutput getRole(@Argument  String id){
        return findGroupEndpointAdapter.findGroup(id);
    }
    @SchemaMapping(typeName = "Query", field = "groupOfUser")
    public List<GroupOutput> getGroupByUserID(@Argument  String userID){
        return findGroupEndpointAdapter.findByUserID(userID);
    }
}
