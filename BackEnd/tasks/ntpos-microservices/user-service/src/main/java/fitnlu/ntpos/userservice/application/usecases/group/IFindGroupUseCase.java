package fitnlu.ntpos.userservice.application.usecases.group;

import fitnlu.ntpos.userservice.domain.model.Group;

public interface IFindGroupUseCase {
    Group findGroup(String name);
    Group findGroupByID(String id);
}
