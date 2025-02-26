package fitnlu.ntpos.userservice.application.services.user;

import fitnlu.ntpos.userservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.userservice.application.usecases.user.*;
import fitnlu.ntpos.userservice.domain.model.TimeSearch;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FindUserService implements IFindAllUserUseCase,
        IFindUserUseCase,
        IFindAllUserByGroupNameUseCase,
        IFindAllUserByGroupIDUseCase,
        IFilterUserByTimeUseCase,
        IFilterUserUseCase {
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

    @Override
    public boolean isVerify(String id) {
        return iReadProductPort.checkUserVerify(id);
    }

    @Override
    public List<User> findAllUserByGroupName(String groupName) {
        return iReadProductPort.findAllUserByGroupName(groupName);
    }

    @Override
    public List<User> findAllUserByGroupID(String groupID) {
        return iReadProductPort.findAllUserByGroupID(groupID);
    }

    @Override
    public List<User> filterUserByTime(TimeSearch timeSearch) {
        return iReadProductPort.filterUserByTime(timeSearch);
    }

    @Override
    public List<User> filterUser(IPaging paging,String groupID, String searchType, String searchValue, String sortType, String sortValue) {
        return iReadProductPort.filterUser(paging,groupID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<User> filterUser(String groupID, String searchType, String searchValue, String sortType, String sortValue) {
        return iReadProductPort.filterUser(groupID, searchType, searchValue, sortType, sortValue);
    }
}
