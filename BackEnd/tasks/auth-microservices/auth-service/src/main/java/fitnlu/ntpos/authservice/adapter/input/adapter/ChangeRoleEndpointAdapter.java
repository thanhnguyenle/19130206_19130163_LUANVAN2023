package fitnlu.ntpos.authservice.adapter.input.adapter;

import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.authservice.application.ports.input.IChangeUserEndpointPort;
import fitnlu.ntpos.authservice.application.usecases.ISubmitNewUserUseCase;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;

@Adapter
@AllArgsConstructor
public class ChangeRoleEndpointAdapter implements IChangeUserEndpointPort {
    private final UserMapperInput userMapperInput;
    private final ISubmitNewUserUseCase iSubmitNewUserUseCase;
    @Override
    public UnitReactive<UserOutput> saveUser(UserInput userInput)  {
        return iSubmitNewUserUseCase.saveNew(userMapperInput.toDomainFromSaveBody(userInput)).map(userMapperInput::toDTO);
    }

    @Override
    public UserOutput saveUserSync(UserInput userInput) {
        User user = iSubmitNewUserUseCase.saveNewSync(userMapperInput.toDomainFromSaveBody(userInput));
        return userMapperInput.toDTO(user);
    }
}
