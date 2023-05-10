package fitnlu.ntpos.userservice.application.usecases;

import fitnlu.ntpos.userservice.domain.model.Group;

public interface IRemoveGroupUseCase {
    Group removeGroup(String name);

}