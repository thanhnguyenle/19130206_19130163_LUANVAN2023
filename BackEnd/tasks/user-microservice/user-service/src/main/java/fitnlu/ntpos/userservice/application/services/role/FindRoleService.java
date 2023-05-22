package fitnlu.ntpos.userservice.application.services.role;

import fitnlu.ntpos.userservice.application.ports.output.IReadRolePort;
import fitnlu.ntpos.userservice.application.usecases.role.IFindAllRoleOfGroupIDUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.IFindAllRoleUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.IFindRoleByGroupNameUseCase;
import fitnlu.ntpos.userservice.application.usecases.role.IFindRoleUseCase;
import fitnlu.ntpos.userservice.domain.model.Role;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FindRoleService implements IFindRoleUseCase, IFindAllRoleUseCase, IFindRoleByGroupNameUseCase, IFindAllRoleOfGroupIDUseCase {
    private final IReadRolePort iReadRolePort;

    @Override
    public List<Role> findAllSync() {
        return iReadRolePort.findAllSync();
    }

    @Override
    public Role findByNameSync(String name) {
        return iReadRolePort.findByNameSync(name);
    }
   public  List<Role> findByUserID(String id){
        return iReadRolePort.findByUserID(id);
    }


    @Override
    public List<Role> findRoleByGroupName(String groupName) {
        return iReadRolePort.findRoleOfGroupName(groupName);
    }

    @Override
    public List<Role> findAllRoleOfGroupID(String id) {
        return iReadRolePort.findRoleOfGroupID(id);
    }
}
