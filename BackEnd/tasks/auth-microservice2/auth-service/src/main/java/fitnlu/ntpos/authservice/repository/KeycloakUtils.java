package fitnlu.ntpos.authservice.repository;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.stereotype.Component;

@Component
public class KeycloakUtils {
//    private final Environment environment;
    private Keycloak keycloakInstance = null;
    public static final  String KEYCLOAK_AUTH_SERVER_URL = "http://keycloak:8080/auth";
    public static final String KEYCLOAK_REALM = "spring-test";
    //set role for client-id in Service Account Role => Client Role => realm-management => all row
    public static final String KEYCLOAK_CLIENT_ID = "user-test";
    public static final String KEYCLOAK_CLIENT_SECRET = "G5Z8Q5g91JWhRTKj71j2o8M7d1qSNWDY";

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
