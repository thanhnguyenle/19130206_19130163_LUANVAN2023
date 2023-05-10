package fitnlu.ntpos.userservice.application.usecases;

import fitnlu.ntpos.userservice.domain.model.Group;

import java.util.List;

public interface IFindAllGroupUseCase {
    List<Group> findAllSync();
}
