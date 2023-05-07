package fitnlu.ntpos.authservice.application.ports.output;

import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

public interface IWriteRolePort {
    UnitReactive<User> saveNew(User user) ;
    User saveNewSync(User user) ;
}
