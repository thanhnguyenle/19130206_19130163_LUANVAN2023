package fitnlu.ntpos.authservice.application.ports.input;

import fitnlu.ntpos.authservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IFindRoleEndpointPort {
    List<RoleOutput> findAllSync();
    RoleOutput findByNameSync(String name);
}
