package fitnlu.ntpos.userservice.application.ports.output;

import fitnlu.ntpos.userservice.domain.model.Role;

public interface IWriteGroupPort {
    Role createRoleSync(Role role) ;
    Role deleteRoleSync(String name) ;
    Role updateRoleSync(String name, Role role) ;
}
