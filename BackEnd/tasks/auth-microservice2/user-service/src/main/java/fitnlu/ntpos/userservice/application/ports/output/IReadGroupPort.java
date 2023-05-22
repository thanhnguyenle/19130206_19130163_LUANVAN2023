package fitnlu.ntpos.userservice.application.ports.output;

import fitnlu.ntpos.userservice.domain.model.Group;

import java.util.List;

public interface IReadGroupPort {
    List<Group> findAllSync();
    Group findByNameSync(String name);

    Group findByGroupID(String id);
    List<Group> findByUserID(String id);




}
