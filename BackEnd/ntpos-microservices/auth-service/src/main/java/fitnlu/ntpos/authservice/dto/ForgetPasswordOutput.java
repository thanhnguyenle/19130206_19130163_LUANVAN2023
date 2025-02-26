package fitnlu.ntpos.authservice.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ForgetPasswordOutput {
    private boolean success;
}
