package fitnlu.ntpos.userservice.application.usecases;

import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

public interface IFindUserUseCase {
    UnitReactive<User> findById(String id);
    User findByIdSync(String id);

}