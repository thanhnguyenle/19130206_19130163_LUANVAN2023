package fitnlu.ntpos.authservice.adapter.input.adapter;

import fitnlu.ntpos.authservice.adapter.input.dto.LoginInput;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginOutput;
import fitnlu.ntpos.authservice.application.ports.input.ILoginEndpointPort;
import fitnlu.ntpos.authservice.application.usecases.ILoginUseCase;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import lombok.AllArgsConstructor;

@Adapter
@AllArgsConstructor
public class LoginEndpointAdapter implements ILoginEndpointPort {
    ILoginUseCase iLoginUsecase;

    @Override
    public LoginOutput login(LoginInput loginInput) {
        return iLoginUsecase.login(loginInput);
    }
}
