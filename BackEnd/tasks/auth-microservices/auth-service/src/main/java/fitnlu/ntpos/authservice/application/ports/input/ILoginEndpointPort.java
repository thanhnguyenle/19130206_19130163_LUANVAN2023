package fitnlu.ntpos.authservice.application.ports.input;

import fitnlu.ntpos.authservice.adapter.input.dto.LoginInput;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginOutput;

public interface ILoginEndpointPort {
    LoginOutput login(LoginInput loginInput);
}
