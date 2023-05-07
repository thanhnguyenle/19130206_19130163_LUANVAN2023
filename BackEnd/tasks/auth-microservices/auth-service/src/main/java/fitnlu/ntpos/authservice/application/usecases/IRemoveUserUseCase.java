package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.User;

public interface IRemoveUserUseCase {
    User removeUser(String id);

}