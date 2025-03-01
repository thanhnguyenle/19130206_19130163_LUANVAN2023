package fitnlu.ntpos.userservice.application.ports.output;

import fitnlu.ntpos.userservice.domain.model.TimeSearch;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IReadUserPort {
    CollectionReactive<User> findAll();
   List<User> findAllSync();
    UnitReactive<User> findById(String id);
    User findByIdSync(String id);

    List<User> findAllUserByGroupName(String groupName);
    List<User> findAllUserByGroupID(String groupID);
    List<User> filterUserByTime(TimeSearch timeSearch);
    List<User> filterUser(IPaging paging,String groupID, String searchType, String searchValue, String sortType, String sortValue);
    List<User> filterUser(String groupID, String searchType, String searchValue, String sortType, String sortValue);
    boolean checkUserVerify(String id);
}
