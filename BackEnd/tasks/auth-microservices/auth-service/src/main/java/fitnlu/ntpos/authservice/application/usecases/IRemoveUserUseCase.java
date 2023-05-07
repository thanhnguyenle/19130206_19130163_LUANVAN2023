package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.Role;

public interface IRemoveUserUseCase {
    Role updateRole(String name, Role role);

}