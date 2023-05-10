package fitnlu.ntpos.userservice.adapter.input;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import fitnlu.ntpos.userservice.adapter.input.adapter.ChangeRoleEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.adapter.FindRoleEndpointAdapter;
import fitnlu.ntpos.userservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.userservice.adapter.input.dto.RoleOutput;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class RoleController implements GraphQLQueryResolver, GraphQLMutationResolver {
    private final ChangeRoleEndpointAdapter changeRoleEndpointAdapter;
    private final FindRoleEndpointAdapter findRoleEndpointAdapter;
    //Mutation
    @SchemaMapping(typeName = "Mutation", field = "createRole")
    public RoleOutput createRole(@Argument("roleInput") @Valid RoleInput roleInput){
        return changeRoleEndpointAdapter.createRoleSync(roleInput);
    }

    @SchemaMapping(typeName = "Mutation", field = "updateRole")
    public RoleOutput updateRole(@Argument  String name, @Argument("roleInput") @Valid RoleInput roleInput){
        return changeRoleEndpointAdapter.updateRoleSync(name,roleInput);
    }
    @SchemaMapping(typeName = "Mutation", field = "deleteRole")
    public RoleOutput deleteRole(@Argument  String name){
        return changeRoleEndpointAdapter.deleteRoleSync(name);
    }

    //Query
    @SchemaMapping(typeName = "Query", field = "roles")
    public List<RoleOutput> getALlRoles(){
        return findRoleEndpointAdapter.findAllSync();
    }

    @SchemaMapping(typeName = "Query", field = "role")
    public RoleOutput getRoleByName(@Argument  String name){
        return findRoleEndpointAdapter.findByNameSync(name);
    }

//    @SchemaMapping(typeName = "Query", field = "role")
//    public List<RoleOutput> getRoleByUserID(@Argument  String id){
//        return findRoleEndpointAdapter.findByUserID(id);
//    }
}
