package fitnlu.ntpos.userservice.application.ports.input;


import fitnlu.ntpos.userservice.adapter.input.dto.ListUserOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.userservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.userservice.domain.model.TimeSearch;
import fitnlu.ntpos.userservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.userservice.infrastructure.paging.PageRequest;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IFindUserEndpointPort {
    CollectionReactive<UserOutput> findALL();
    List<UserOutput> findAllSync();

    UnitReactive<UserOutput> findById(String id);
    UserOutput findByIdSync(String id);

    List<UserOutput> findUserByGroupName(String groupName);
    List<UserOutput> findUserByGroupID(String groupID);
    List<UserOutput> filterUserByTime(TimeSearch timeSearch);
    ListUserOutput filterUser(PagingInput pagingInput, String groupID, String searchType, String searchValue, String sortType, String sortValue);
    boolean isVerify(String id);
}
