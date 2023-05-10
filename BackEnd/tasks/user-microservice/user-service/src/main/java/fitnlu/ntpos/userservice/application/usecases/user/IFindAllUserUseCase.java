package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;

import java.util.List;

public interface IFindAllUserUseCase {
    CollectionReactive<User> findAll();
    List<User> findAllSync();
}