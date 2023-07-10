package fitnlu.ntpos.authservice.application.services;

import fitnlu.ntpos.authservice.adapter.input.dto.LoginInput;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginOutput;
import fitnlu.ntpos.authservice.application.ports.output.ILoginPort;
import fitnlu.ntpos.authservice.application.usecases.ILoginUseCase;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService implements ILoginUseCase {
    private final ILoginPort iLoginPort;
    @Override
    public LoginOutput login(LoginInput loginInput) {
        return iLoginPort.login(loginInput);
    }
}
