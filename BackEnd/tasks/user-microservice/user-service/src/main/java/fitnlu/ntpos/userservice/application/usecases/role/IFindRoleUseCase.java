package fitnlu.ntpos.userservice.application.usecases;

import fitnlu.ntpos.userservice.domain.model.Role;

import java.util.List;

public interface IFindRoleUseCase {
    Role findByNameSync(String name);
    List<Role> findByUserID(String id);
}