package fitnlu.ntpos.authservice.application.ports.output;

import fitnlu.ntpos.authservice.domain.model.Role;

public interface IWriteRolePort {
    Role createRoleSync(Role role) ;
    Role deleteRoleSync(String name) ;
    Role updateRoleSync(String name, Role role) ;
}
