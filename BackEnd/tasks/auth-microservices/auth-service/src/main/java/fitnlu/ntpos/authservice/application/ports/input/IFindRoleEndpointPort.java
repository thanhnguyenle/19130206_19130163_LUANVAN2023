package fitnlu.ntpos.authservice.application.ports.input;

import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IFindUserEndpointPort {
    CollectionReactive<UserOutput> findALL();
    List<UserOutput> findAllSync();

    UnitReactive<UserOutput> findById(String id);
    UserOutput findByIdSync(String id);
}
