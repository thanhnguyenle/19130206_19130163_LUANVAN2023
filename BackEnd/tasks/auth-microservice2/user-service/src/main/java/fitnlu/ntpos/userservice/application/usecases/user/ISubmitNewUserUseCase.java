package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

public interface ISubmitNewUserUseCase {
    UnitReactive<User> saveNew(User user);
    User saveNewSync(User user) ;
}