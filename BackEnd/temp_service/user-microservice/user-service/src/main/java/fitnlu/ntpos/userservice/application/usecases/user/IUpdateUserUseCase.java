package fitnlu.ntpos.userservice.application.usecases.user;

import fitnlu.ntpos.userservice.domain.model.User;

public interface IUpdateUserUseCase {
    User updateUser(String name, User user);

}