package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;

public interface IUpdateUserUseCase {
    User updateUser(String name, User user);

}