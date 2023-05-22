package fitnlu.ntpos.userservice.application.services.group;

import fitnlu.ntpos.userservice.application.ports.output.IWriteGroupPort;
import fitnlu.ntpos.userservice.application.usecases.group.ISubmitNewGroupUseCase;
import fitnlu.ntpos.userservice.domain.model.Group;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SubmitNewGroupService implements ISubmitNewGroupUseCase {
    private final IWriteGroupPort iSubmitNewGroupUseCase;
    @Override
    public Group submitNewGroup(Group group) {
        return iSubmitNewGroupUseCase.createGroupSync(group);
    }
}
