package fitnlu.ntpos.authservice.application.ports.output;

import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IReadRolePort {
   List<Role> findAllSync();
    Role findByNameSync(String name);

}
