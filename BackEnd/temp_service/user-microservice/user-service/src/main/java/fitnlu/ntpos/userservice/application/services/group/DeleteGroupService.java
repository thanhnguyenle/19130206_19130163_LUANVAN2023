package fitnlu.ntpos.userservice.application.services.group;

import fitnlu.ntpos.userservice.application.ports.output.IWriteGroupPort;
import fitnlu.ntpos.userservice.application.usecases.group.IRemoveGroupUseCase;
import fitnlu.ntpos.userservice.domain.model.Group;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DeleteGroupService implements IRemoveGroupUseCase {
    private final IWriteGroupPort iWriteGroupPort;
    @Override
    public Group removeGroup(String id) {
        return iWriteGroupPort.deleteGroupSync(id);
    }
}
