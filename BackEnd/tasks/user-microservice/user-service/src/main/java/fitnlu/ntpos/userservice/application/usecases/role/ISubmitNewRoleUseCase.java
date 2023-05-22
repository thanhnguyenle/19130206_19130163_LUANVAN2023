package fitnlu.ntpos.userservice.application.usecases.role;

import fitnlu.ntpos.userservice.domain.model.Role;

public interface ISubmitNewRoleUseCase {
    Role saveNewSync(Role role) ;
}