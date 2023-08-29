package fitnlu.ntpos.userservice.application.ports.input;

import fitnlu.ntpos.userservice.adapter.input.dto.GroupOutput;

import java.util.List;

public interface IFindGroupEndpointPort {
    List<GroupOutput> findAllSync();
    GroupOutput findByNameSync(String name);
    GroupOutput findGroup(String id);
    List<GroupOutput> findByUserID(String id);

}
