package fitnlu.ntpos.userservice.application.usecases.role;

import fitnlu.ntpos.userservice.domain.model.Role;

import java.util.List;

public interface IFindAllRoleUseCase {
    List<Role> findAllSync();
}