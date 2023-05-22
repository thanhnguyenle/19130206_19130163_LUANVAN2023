package fitnlu.ntpos.authservice.application.ports.output;

import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

import java.util.List;
import java.util.UUID;

public interface IReadUserPort {
    CollectionReactive<User> findAll();
   List<User> findAllSync();
    UnitReactive<User> findById(String id);
    User findByIdSync(String id);
}
