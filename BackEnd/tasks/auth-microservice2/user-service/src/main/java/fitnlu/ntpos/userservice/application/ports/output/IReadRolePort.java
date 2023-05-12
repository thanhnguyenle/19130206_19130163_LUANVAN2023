package fitnlu.ntpos.userservice.application.ports.output;

import fitnlu.ntpos.userservice.domain.model.Role;

import java.util.List;

public interface IReadRolePort {
   List<Role> findAllSync();
    Role findByNameSync(String name);
    List<Role> findByUserID(String id);

    List<Role> findRoleOfGroupName(String name);
    List<Role> findRoleOfGroupID(String id);
}
