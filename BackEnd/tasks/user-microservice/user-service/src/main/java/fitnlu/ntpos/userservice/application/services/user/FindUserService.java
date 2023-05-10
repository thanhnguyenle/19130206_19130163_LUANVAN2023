package fitnlu.ntpos.userservice.application.services;

import fitnlu.ntpos.userservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.userservice.application.usecases.IFindAllUserUseCase;
import fitnlu.ntpos.userservice.application.usecases.IFindUserUseCase;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FindUserService implements IFindAllUserUseCase, IFindUserUseCase {
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
