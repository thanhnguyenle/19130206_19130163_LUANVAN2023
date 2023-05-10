package fitnlu.ntpos.userservice.application.usecases.role;

import fitnlu.ntpos.userservice.domain.model.Role;

import java.util.List;

public interface IFindRoleByGroupNameUseCase {
    List<Role> findRoleByGroupName(String groupName);
}
