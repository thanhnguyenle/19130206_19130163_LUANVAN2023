package fitnlu.ntpos.authservice.application.usecases;

import fitnlu.ntpos.authservice.adapter.input.dto.LoginInput;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginOutput;

public interface ILoginUseCase {
    LoginOutput login(LoginInput loginInput);
}
