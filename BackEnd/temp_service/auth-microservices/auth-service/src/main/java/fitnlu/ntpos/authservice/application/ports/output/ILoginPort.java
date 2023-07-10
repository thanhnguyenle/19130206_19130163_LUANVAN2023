package fitnlu.ntpos.authservice.application.ports.output;

import fitnlu.ntpos.authservice.adapter.input.dto.LoginInput;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginOutput;
import fitnlu.ntpos.authservice.domain.model.User;

public interface ILoginPort {
    LoginOutput login(LoginInput loginInput);
}
