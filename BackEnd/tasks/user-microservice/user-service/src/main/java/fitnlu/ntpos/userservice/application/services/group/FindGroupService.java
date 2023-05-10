package fitnlu.ntpos.userservice.application.services.group;

import fitnlu.ntpos.userservice.application.ports.output.IReadGroupPort;
import fitnlu.ntpos.userservice.application.usecases.group.IFindAllGroupUseCase;
import fitnlu.ntpos.userservice.application.usecases.group.IFindGroupByUserIDUseCase;
import fitnlu.ntpos.userservice.application.usecases.group.IFindGroupUseCase;
import fitnlu.ntpos.userservice.domain.model.Group;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class FindGroupService implements IFindAllGroupUseCase, IFindGroupUseCase, IFindGroupByUserIDUseCase {
    private final IReadGroupPort iReadGroupPort;
    @Override
    public List<Group> findAllSync() {
        return iReadGroupPort.findAllSync();
    }

    @Override
    public Group findGroup(String name) {
        return iReadGroupPort.findByNameSync(name);
    }

    @Override
    public Group findGroupByID(String id) {
        return iReadGroupPort.findByGroupID(id);
    }

    @Override
    public List<Group> findGroupByUserID(String userID) {
        return iReadGroupPort.findByUserID(userID);
    }
}
