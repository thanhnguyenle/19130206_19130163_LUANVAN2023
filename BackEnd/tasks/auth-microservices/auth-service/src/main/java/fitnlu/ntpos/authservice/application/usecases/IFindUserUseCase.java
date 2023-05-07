package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;

import java.util.List;

public interface IFindUserUseCase {
    CollectionReactive<User> findAll();
    List<User> findAllSync();
}