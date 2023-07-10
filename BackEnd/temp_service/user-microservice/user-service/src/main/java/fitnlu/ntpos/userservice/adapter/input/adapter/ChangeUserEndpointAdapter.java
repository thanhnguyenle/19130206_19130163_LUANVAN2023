package fitnlu.ntpos.userservice.adapter.input.adapter;

import fitnlu.ntpos.userservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.userservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.UserScalarOutput;
import fitnlu.ntpos.userservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.userservice.application.ports.input.IChangeUserEndpointPort;
import fitnlu.ntpos.userservice.application.usecases.user.*;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;

import java.util.List;

@Adapter
@AllArgsConstructor
public class ChangeUserEndpointAdapter implements IChangeUserEndpointPort {
    private final UserMapperInput userMapperInput;
    private final ISubmitNewUserUseCase iSubmitNewUserUseCase;
    private final IRemoveUserUseCase iRemoveUserUseCase;
    private final IUpdateUserUseCase iUpdateUserUseCase;
    private final IAddRoleToUserUseCase iAddRoleToUserUseCase;
    private final IRemoveRoleFromUserUseCase iRemoveRoleFromUserUseCase;
    private final ILockUserUseCase iLockUserUseCase;
    private final IUnlockUserUseCase iUnlockUserUseCase;
    @Override
    public UnitReactive<UserOutput> saveUser(UserInput userInput)  {
        return iSubmitNewUserUseCase.saveNew(userMapperInput.toDomainFromSaveBody(userInput)).map(UserMapperInput::toDTO);
    }

    @Override
    public UserOutput saveUserSync(UserInput userInput) {
        User user = iSubmitNewUserUseCase.saveNewSync(userMapperInput.toDomainFromSaveBody(userInput));
        return UserMapperInput.toDTO(user);
    }

    @Override
    public UserOutput deleteUserSync(String id) {
        return UserMapperInput.toDTO(iRemoveUserUseCase.removeUser(id));
    }

    @Override
    public UserOutput updateUserSync(String id, UserInput user) {
        return UserMapperInput.toDTO(iUpdateUserUseCase.updateUser(id, userMapperInput.toDomainFromSaveBody(user)));
    }

    @Override
    public UserScalarOutput addRoleToUser(String username,  List<String>  roleName) {
        return userMapperInput.toDTO(iAddRoleToUserUseCase.addRoleToUser(username, roleName));
    }

    @Override
    public UserScalarOutput removeRoleToUser(String username,  List<String> roleName) {
        return userMapperInput.toDTO(iRemoveRoleFromUserUseCase.removeRoleToUser(username, roleName));
    }

    @Override
    public boolean lockUser(String id) {
        return iLockUserUseCase.lockUser(id);
    }

    @Override
    public boolean unlockUser(String id) {
        return iUnlockUserUseCase.unlockUser(id);
    }
}
