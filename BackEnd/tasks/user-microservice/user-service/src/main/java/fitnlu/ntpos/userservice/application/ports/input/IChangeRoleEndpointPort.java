package fitnlu.ntpos.authservice.application.ports.input;

import fitnlu.ntpos.authservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.authservice.adapter.input.dto.RoleOutput;

public interface IChangeRoleEndpointPort {
    RoleOutput createRoleSync(RoleInput role) ;
    RoleOutput deleteRoleSync(String name) ;
    RoleOutput updateRoleSync(String name, RoleInput role) ;
}
