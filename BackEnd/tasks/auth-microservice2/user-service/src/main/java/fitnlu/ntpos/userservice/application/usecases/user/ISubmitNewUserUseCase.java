package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface ISubmitNewUserUseCase {
    UnitReactive<User> saveNew(User user);
    User saveNewSync(User user) ;

    boolean addBatchUsers(List<User> users);
}