package fitnlu.ntpos.userservice.adapter.input;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import fitnlu.ntpos.userservice.adapter.input.adapter.ChangeUserEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindRoleEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindUserEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.userservice.adapter.input.dto.UserOutput;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class GroupController implements GraphQLQueryResolver, GraphQLMutationResolver {
    private final ChangeUserEndpointAdapter changeUserEndpointAdapter;
    private final FindUserEndpointAdapter findUserEndpointAdapter;
    private final FindRoleEndpointAdapter findRoleEndpointAdapter;
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

    //Query
    @SchemaMapping(typeName = "Query", field = "users")
    public List<UserOutput> getAllUser(){
        List<UserOutput> list = findUserEndpointAdapter.findAllSync();
        list.forEach(userOutput -> {
            userOutput.setRoles(findRoleEndpointAdapter.findByUserID(userOutput.getId()));
        });
        return list;
    }

    @SchemaMapping(typeName = "Query", field = "user")
    public UserOutput getUserById(@Argument  String id){
        UserOutput userOutput = findUserEndpointAdapter.findByIdSync(id);
        userOutput.setRoles(findRoleEndpointAdapter.findByUserID(userOutput.getId()));
        return userOutput;
    }


}
