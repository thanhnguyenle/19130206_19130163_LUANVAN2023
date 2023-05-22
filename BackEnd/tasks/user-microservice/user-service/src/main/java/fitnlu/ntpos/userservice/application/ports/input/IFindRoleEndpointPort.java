package fitnlu.ntpos.userservice.application.ports.input;

import fitnlu.ntpos.userservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.userservice.domain.model.Role;

import java.util.List;

public interface IFindRoleEndpointPort {
    List<RoleOutput> findAllSync();
    RoleOutput findByNameSync(String name);
    List<RoleOutput> findByUserID(String id);
    List<RoleOutput> findRoleOfGroupName(String name);
    List<RoleOutput> findRoleOfGroupID(String id);
}
