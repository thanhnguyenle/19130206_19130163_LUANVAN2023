package fitnlu.ntpos.userservice.application.usecases.group;

import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

public interface ISubmitNewGroupUseCase {
    Group submitNewGroup(Group group);
}