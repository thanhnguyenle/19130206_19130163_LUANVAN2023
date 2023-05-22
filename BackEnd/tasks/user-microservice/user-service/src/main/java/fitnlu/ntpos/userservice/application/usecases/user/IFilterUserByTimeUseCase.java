package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.TimeSearch;
import fitnlu.ntpos.userservice.domain.model.User;

import java.util.List;

public interface IFilterUserByTimeUseCase {
    List<User> filterUserByTime(TimeSearch timeSearch);
}
