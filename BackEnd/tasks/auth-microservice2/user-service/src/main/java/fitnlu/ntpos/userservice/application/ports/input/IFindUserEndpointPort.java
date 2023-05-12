package fitnlu.ntpos.userservice.application.ports.input;


import fitnlu.ntpos.userservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IFindUserEndpointPort {
    CollectionReactive<UserOutput> findALL();
    List<UserOutput> findAllSync();

    UnitReactive<UserOutput> findById(String id);
    UserOutput findByIdSync(String id);

    List<UserOutput> findUserByGroupName(String groupName);
    List<UserOutput> findUserByGroupID(String groupID);
}
