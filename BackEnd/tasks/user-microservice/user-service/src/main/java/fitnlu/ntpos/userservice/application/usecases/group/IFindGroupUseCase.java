package fitnlu.ntpos.userservice.application.usecases;

import fitnlu.ntpos.userservice.domain.model.Group;

public interface IFindGroupUseCase {
    Group findGroup(String name);
}
