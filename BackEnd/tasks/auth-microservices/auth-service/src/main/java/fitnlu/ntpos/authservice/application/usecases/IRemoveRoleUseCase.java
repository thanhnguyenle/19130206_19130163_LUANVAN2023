package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.Role;

public interface IRemoveRoleUseCase {
    Role updateRole(String name, Role role);

}