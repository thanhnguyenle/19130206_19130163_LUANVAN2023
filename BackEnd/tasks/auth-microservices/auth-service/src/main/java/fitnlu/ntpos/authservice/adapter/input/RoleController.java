package fitnlu.ntpos.authservice.adapter.input;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import fitnlu.ntpos.authservice.adapter.input.adapter.ChangeRoleEndpointAdapter;
import fitnlu.ntpos.authservice.adapter.input.adapter.ChangeUserEndpointAdapter;
import fitnlu.ntpos.authservice.adapter.input.adapter.FindRoleEndpointAdapter;
import fitnlu.ntpos.authservice.adapter.input.adapter.FindUserEndpointAdapter;
import fitnlu.ntpos.authservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.authservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
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
    public RoleOutput updateRole(@Argument  String id, @Argument("roleInput") @Valid RoleInput roleInput){
        return changeRoleEndpointAdapter.updateRoleSync(id,roleInput);
    }
    @SchemaMapping(typeName = "Mutation", field = "deleteRole")
    public RoleOutput deleteRole(@Argument  String id){
        return changeRoleEndpointAdapter.deleteRoleSync(id);
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


}
