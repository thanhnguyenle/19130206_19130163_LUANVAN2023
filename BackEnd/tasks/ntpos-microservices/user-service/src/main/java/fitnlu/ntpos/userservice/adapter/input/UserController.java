package fitnlu.ntpos.userservice.adapter.input;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import fitnlu.ntpos.userservice.adapter.input.adapter.ChangeUserEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindRoleEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindUserEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.dto.*;
import fitnlu.ntpos.userservice.adapter.input.until.CursorUntil;
import fitnlu.ntpos.userservice.domain.model.TimeSearch;
import graphql.relay.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.Nullable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController implements GraphQLQueryResolver, GraphQLMutationResolver {
    private final ChangeUserEndpointAdapter changeUserEndpointAdapter;
    private final FindUserEndpointAdapter findUserEndpointAdapter;
    private final FindRoleEndpointAdapter findRoleEndpointAdapter;
    private final CursorUntil cursorUntil;
    //Mutation
    @SchemaMapping(typeName = "Mutation", field = "createUser")
    public UserOutput createUser(@Argument("userInput") @Valid UserInput userInput){
        return changeUserEndpointAdapter.saveUserSync(userInput);
    }
    @SchemaMapping(typeName = "Mutation", field = "updateUser")
    public UserOutput updateUser(@Argument  String id, @Argument("userInput") @Valid UserInput user){
        return changeUserEndpointAdapter.updateUserSync(id,user);
    }
    @SchemaMapping(typeName = "Mutation", field = "deleteUser")
    public UserOutput deleteUser(@Argument  String id){
        return changeUserEndpointAdapter.deleteUserSync(id);
    }

    @SchemaMapping(typeName = "Mutation", field = "addRoleToUser")
    public UserScalarOutput addRoleToUser(@Argument("roleNames")  List<String>  roleName, @Argument("userID") String userID){
        return changeUserEndpointAdapter.addRoleToUser(userID,roleName);
    }
//    @PreAuthorize("hasAuthority('remove_role_user')")
    @SchemaMapping(typeName = "Mutation", field = "removeRoleFromUser")
    public UserScalarOutput removeRoleFromUser(@Argument("roleNames")  List<String>  roleName, @Argument("userID") String userID){
        return changeUserEndpointAdapter.removeRoleToUser(userID,roleName);
    }

    //Query
//    @PreAuthorize("hasAuthority('view_all_user')")
    @SchemaMapping(typeName = "Query", field = "users")
    public List<UserOutput> getAllUser(){
        return findUserEndpointAdapter.findAllSync();
    }

//    @PreAuthorize("hasAuthority('view_all_user')")
    @SchemaMapping(typeName = "Query", field = "usersPaging")
    public Connection<UserOutput> getAllUserPaging(@Argument int first,@Argument @Nullable String cursor) {
        List<Edge<UserOutput>> edges = findUserEndpointAdapter.findAllSync()
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
//    @PreAuthorize("hasAuthority('view_user_by_id')")
    @SchemaMapping(typeName = "Query", field = "user")
    public UserOutput getUserById(@Argument  String id){
        UserOutput userOutput = findUserEndpointAdapter.findByIdSync(id);
        userOutput.setRoles(findRoleEndpointAdapter.findByUserID(userOutput.getId()));
        return userOutput;
    }

//    @PreAuthorize("hasAuthority('view_users_by_time')")
    @SchemaMapping(typeName = "Query", field = "usersFilterByTime")
    public List<UserOutput> usersFilterByTime(@Argument TimeSearch timeSearch){
        return findUserEndpointAdapter.filterUserByTime(timeSearch);
    }
    @SchemaMapping(typeName = "Query", field = "usersFilter")
    public ListUserOutput usersFilter(@Argument PagingInput paging, @Argument String groupID, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue){
        return findUserEndpointAdapter.filterUser(paging,groupID,searchType,searchValue,sortType,sortValue);
    }
    @SchemaMapping(typeName = "Query", field = "isVerify")
    public ResultOutput isVerify(@Argument String id){
        return ResultOutput.builder()
                .isVerify(findUserEndpointAdapter.isVerify(id))
                .build();
    }
}
