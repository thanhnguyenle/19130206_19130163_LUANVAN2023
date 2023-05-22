package fitnlu.ntpos.userservice.application.usecases.group;

import fitnlu.ntpos.userservice.domain.model.Group;

public interface IRemoveGroupUseCase {
    Group removeGroup(String id);

}