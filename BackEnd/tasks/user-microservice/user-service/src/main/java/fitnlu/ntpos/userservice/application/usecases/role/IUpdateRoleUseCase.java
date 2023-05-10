package fitnlu.ntpos.userservice.application.usecases;

import fitnlu.ntpos.userservice.domain.model.Role;

public interface IUpdateRoleUseCase {
    Role updateRole(String name, Role role);

}