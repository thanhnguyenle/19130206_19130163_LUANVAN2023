package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFilterUserUseCase {
    List<User> filterUser(IPaging paging,String groupID, String searchType, String searchValue, String sortType, String sortValue);
    List<User> filterUser(String groupID, String searchType, String searchValue, String sortType, String sortValue);
}
