package fitnlu.ntpos.userservice.application.ports.input;

import fitnlu.ntpos.userservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.userservice.adapter.input.dto.RoleOutput;

public interface IChangeRoleEndpointPort {
    RoleOutput createRoleSync(RoleInput role) ;
    RoleOutput deleteRoleSync(String name) ;
    RoleOutput updateRoleSync(String name, RoleInput role) ;
}
