package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

public interface ISubmitNewRoleUseCase {
    UnitReactive<User> saveNew(User user);
    User saveNewSync(User user) ;
}