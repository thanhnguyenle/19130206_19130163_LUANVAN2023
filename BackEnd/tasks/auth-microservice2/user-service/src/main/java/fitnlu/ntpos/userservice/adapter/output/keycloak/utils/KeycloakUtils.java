package fitnlu.ntpos.userservice.adapter.output.keycloak.utils;

import lombok.experimental.FieldNameConstants;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.springframework.beans.factory.annotation.Value;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.stereotype.Component;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.WebTarget;
import java.util.concurrent.TimeUnit;

@Component
public class KeycloakUtils {
//    private final Environment environment;
    private Keycloak keycloakInstance = null;

    @Value("${keycloak.auth-server-url}")
    private String KEYCLOAK_AUTH_SERVER_URL;
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM ;
    //set role for client-id in Service Account Role => Client Role => realm-management => all row
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID ;
    @Value("${keycloak.credentials.secret}")
    private String KEYCLOAK_CLIENT_SECRET ;

    public Keycloak getKeycloakInstance(){
        if(keycloakInstance==null){
            keycloakInstance = KeycloakBuilder.builder()
                    .serverUrl(KEYCLOAK_AUTH_SERVER_URL)
                    .realm(KEYCLOAK_REALM)
                    .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                    .clientId(KEYCLOAK_CLIENT_ID)
                    .clientSecret(KEYCLOAK_CLIENT_SECRET)
                    .resteasyClient(new ResteasyClientBuilder()
                            .connectTimeout(5000, TimeUnit.MILLISECONDS)
                            .readTimeout(10000, TimeUnit.MILLISECONDS)
                            .connectionPoolSize(10).build()).build();
            keycloakInstance.tokenManager().getAccessToken();
            keycloakInstance.realms().realm(KEYCLOAK_REALM).clients().findAll();
        }
        return keycloakInstance;
    }
}
