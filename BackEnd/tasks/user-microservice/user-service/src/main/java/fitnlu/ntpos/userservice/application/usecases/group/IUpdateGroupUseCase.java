package fitnlu.ntpos.userservice.application.usecases;

import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.Role;

public interface IUpdateGroupUseCase {
    Group updateGroup(String name, Group group);

}