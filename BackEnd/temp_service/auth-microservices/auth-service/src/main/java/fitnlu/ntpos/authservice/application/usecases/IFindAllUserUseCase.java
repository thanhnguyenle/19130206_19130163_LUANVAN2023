package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

import java.util.List;
import java.util.UUID;

public interface IFindAllUserUseCase {
    CollectionReactive<User> findAll();
    List<User> findAllSync();
}