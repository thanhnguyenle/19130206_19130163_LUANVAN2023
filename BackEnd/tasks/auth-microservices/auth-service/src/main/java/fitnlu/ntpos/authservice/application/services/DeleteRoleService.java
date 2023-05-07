package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.authservice.application.usecases.IFindAllUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.IFindUserUseCase;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DeleteRoleService implements IFindAllUserUseCase, IFindUserUseCase {
    private final IReadUserPort iReadProductPort;

    @Override
    public CollectionReactive<User> findAll() {
        return iReadProductPort.findAll();
    }

    @Override
    public List<User> findAllSync() {
        return iReadProductPort.findAllSync();
    }

    @Override
    public UnitReactive<User> findById(String id) {
        return iReadProductPort.findById(id);
    }

    @Override
    public User findByIdSync(String id) {
        return iReadProductPort.findByIdSync(id);
    }
}
