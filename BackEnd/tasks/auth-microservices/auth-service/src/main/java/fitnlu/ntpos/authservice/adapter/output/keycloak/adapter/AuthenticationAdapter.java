package fitnlu.ntpos.authservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.authservice.adapter.input.dto.LoginInput;
import fitnlu.ntpos.authservice.adapter.input.dto.LoginOutput;
import fitnlu.ntpos.authservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.authservice.application.ports.output.ILoginPort;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import lombok.AllArgsConstructor;
import org.keycloak.authorization.client.AuthzClient;
import org.keycloak.authorization.client.Configuration;
import org.keycloak.representations.AccessTokenResponse;

import java.util.HashMap;
import java.util.Map;
@Adapter
@AllArgsConstructor
public class AuthenticationAdapter implements ILoginPort {
    @Override
    public LoginOutput login(LoginInput loginInput) {
        Map<String, Object> clientCredentials = new HashMap<>();
        clientCredentials.put("secret", KeycloakUtils.KEYCLOAK_CLIENT_SECRET);
        clientCredentials.put("grant_type", "password");
        Configuration configuration =
                new Configuration(KeycloakUtils.KEYCLOAK_AUTH_SERVER_URL, KeycloakUtils.KEYCLOAK_REALM, KeycloakUtils.KEYCLOAK_CLIENT_ID,
                        clientCredentials, null);
        AuthzClient authzClient = AuthzClient.create(configuration);
        AccessTokenResponse response =
                authzClient.obtainAccessToken(loginInput.email(),
                        loginInput.password());
        return LoginOutput.builder()
                .accessToken(response.getToken())
                .accessTokenExpiration(response.getExpiresIn())
                .refreshToken(response.getRefreshToken())
                .refreshTokenExpiration(response.getRefreshExpiresIn())
                .build();
    }
}
