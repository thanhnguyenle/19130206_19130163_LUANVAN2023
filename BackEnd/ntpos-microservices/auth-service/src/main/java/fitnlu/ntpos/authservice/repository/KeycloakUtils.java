package fitnlu.ntpos.authservice.repository;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Component;

@Component
@RefreshScope
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
                    .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build()).build();
            keycloakInstance.tokenManager().getAccessToken();
            keycloakInstance.realms().realm(KEYCLOAK_REALM).clients().findAll();
        }
        return keycloakInstance;
    }
}