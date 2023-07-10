package fitnlu.ntpos.userservice.application.usecases.role;

import fitnlu.ntpos.userservice.domain.model.Role;

public interface IRemoveRoleUseCase {
    Role removeRole(String name);

}