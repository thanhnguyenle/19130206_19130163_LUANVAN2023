package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

public interface IFindRoleUseCase {
    Role findByNameSync(String name);

}