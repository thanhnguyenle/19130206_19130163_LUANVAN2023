package fitnlu.ntpos.authservice.adapter.input;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import fitnlu.ntpos.authservice.adapter.input.adapter.ChangeUserEndpointAdapter;
import fitnlu.ntpos.authservice.adapter.input.adapter.LoginEndpointAdapter;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginInput;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController  implements GraphQLQueryResolver, GraphQLMutationResolver {
    private final LoginEndpointAdapter loginEndpointAdapter;
    private final ChangeUserEndpointAdapter changeUserEndpointAdapter;
    @SchemaMapping(typeName = "Query", field = "login")
    public LoginOutput login(@Argument("loginInput")LoginInput loginInput){
        return loginEndpointAdapter.login(loginInput);
    }
    @SchemaMapping(typeName = "Mutation", field = "register")
    public UserOutput createUser(@Argument("registerInput") @Valid UserInput userInput){
        return changeUserEndpointAdapter.saveUserSync(userInput);
    }

}
