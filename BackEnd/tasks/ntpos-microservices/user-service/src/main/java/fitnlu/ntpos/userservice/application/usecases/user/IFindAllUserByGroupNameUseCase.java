package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.User;

import java.util.List;

public interface IFindAllUserByGroupNameUseCase {
    List<User> findAllUserByGroupName(String groupName);
}
