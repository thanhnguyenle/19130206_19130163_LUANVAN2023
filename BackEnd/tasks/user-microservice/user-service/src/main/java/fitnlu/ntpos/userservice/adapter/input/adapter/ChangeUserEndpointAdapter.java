package fitnlu.ntpos.authservice.adapter.input.adapter;

import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.authservice.application.ports.input.IChangeUserEndpointPort;
import fitnlu.ntpos.authservice.application.usecases.IRemoveUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.ISubmitNewUserUseCase;
import fitnlu.ntpos.authservice.application.usecases.IUpdateUserUseCase;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;

@Adapter
@AllArgsConstructor
public class ChangeUserEndpointAdapter implements IChangeUserEndpointPort {
    private final UserMapperInput userMapperInput;
    private final ISubmitNewUserUseCase iSubmitNewUserUseCase;
    private final IRemoveUserUseCase iRemoveUserUseCase;
    private final IUpdateUserUseCase iUpdateUserUseCase;
    @Override
    public UnitReactive<UserOutput> saveUser(UserInput userInput)  {
        return iSubmitNewUserUseCase.saveNew(userMapperInput.toDomainFromSaveBody(userInput)).map(userMapperInput::toDTO);
    }

    @Override
    public UserOutput saveUserSync(UserInput userInput) {
        User user = iSubmitNewUserUseCase.saveNewSync(userMapperInput.toDomainFromSaveBody(userInput));
        return userMapperInput.toDTO(user);
    }

    @Override
    public UserOutput deleteUserSync(String id) {
        return userMapperInput.toDTO(iRemoveUserUseCase.removeUser(id));
    }

    @Override
    public UserOutput updateUserSync(String id, UserInput user) {
        return userMapperInput.toDTO(iUpdateUserUseCase.updateUser(id, userMapperInput.toDomainFromSaveBody(user)));
    }
}
