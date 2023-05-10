package fitnlu.ntpos.userservice.application.services;

import fitnlu.ntpos.userservice.application.ports.output.IReadRolePort;
import fitnlu.ntpos.userservice.application.usecases.IFindAllRoleUseCase;
import fitnlu.ntpos.userservice.application.usecases.IFindRoleUseCase;
import fitnlu.ntpos.userservice.domain.model.Role;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FindRoleService implements IFindRoleUseCase, IFindAllRoleUseCase {
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
}
