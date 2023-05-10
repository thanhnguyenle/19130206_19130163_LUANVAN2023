package fitnlu.ntpos.userservice.application.ports.input;

import fitnlu.ntpos.userservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.userservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.UserScalarOutput;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IChangeUserEndpointPort {
    UnitReactive<UserOutput> saveUser(UserInput userInput) ;
    UserOutput saveUserSync(UserInput userInput)  ;
    UserOutput deleteUserSync(String id) ;
    UserOutput updateUserSync(String id, UserInput user) ;

    UserScalarOutput addRoleToUser(String username,  List<String> roleName);
    UserScalarOutput removeRoleToUser(String username,  List<String>  roleName);
    boolean lockUser(String id);
    boolean unlockUser(String id);
}
