package fitnlu.ntpos.authservice.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginOutput {
    private String accessToken;
    private String refreshToken;
    private long accessTokenExpiration;
    private long refreshTokenExpiration;

}
