package fitnlu.ntpos.userservice.adapter.input;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import fitnlu.ntpos.userservice.adapter.input.adapter.ChangeGroupEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindGroupEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindRoleEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindUserEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.dto.GroupInput;
import fitnlu.ntpos.userservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.GroupScalarOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.RoleOutput;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class GroupController implements GraphQLQueryResolver, GraphQLMutationResolver {
    private final FindGroupEndpointAdapter findGroupEndpointAdapter;
    private final ChangeGroupEndpointAdapter changeGroupEndpointAdapter;

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
    public List<GroupOutput> getALlRoles(){
        return findGroupEndpointAdapter.findAllSync();
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
