package fitnlu.ntpos.authservice.application.ports.input;

import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

public interface IChangeUserEndpointPort {
    UnitReactive<UserOutput> saveUser(UserInput userInput) ;
    UserOutput saveUserSync(UserInput userInput)  ;
    UserOutput deleteUserSync(String id) ;
    UserOutput updateUserSync(String id, UserInput user) ;
}
