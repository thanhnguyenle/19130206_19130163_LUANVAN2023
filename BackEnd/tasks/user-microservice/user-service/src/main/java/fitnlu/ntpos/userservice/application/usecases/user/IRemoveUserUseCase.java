package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.User;

public interface IRemoveUserUseCase {
    User removeUser(String id);

}