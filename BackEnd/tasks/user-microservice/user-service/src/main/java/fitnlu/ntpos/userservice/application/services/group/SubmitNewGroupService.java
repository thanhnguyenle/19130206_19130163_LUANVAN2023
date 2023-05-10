package fitnlu.ntpos.userservice.application.services.group;

import fitnlu.ntpos.userservice.application.usecases.group.IFindAllGroupUseCase;
import fitnlu.ntpos.userservice.application.usecases.group.IFindGroupUseCase;
import fitnlu.ntpos.userservice.domain.model.Group;

import java.util.List;

public class SubmitNewGroupService implements IFindAllGroupUseCase, IFindGroupUseCase {
    @Override
    public List<Group> findAllSync() {
        return null;
    }

    @Override
    public Group findGroup(String name) {
        return null;
    }
}
