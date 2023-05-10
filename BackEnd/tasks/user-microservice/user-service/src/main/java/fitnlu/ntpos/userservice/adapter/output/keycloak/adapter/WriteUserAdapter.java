package fitnlu.ntpos.authservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.authservice.adapter.output.keycloak.mapper.UserMapperOutput;
import fitnlu.ntpos.authservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.authservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.authservice.domain.exception.HandlerGraphQLError;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Adapter
@AllArgsConstructor
@Slf4j
public class WriteUserAdapter implements IWriteUserPort {
    private final KeycloakUtils keycloakUtils;
    private final UserMapperOutput userMapperOutput;

    @Override
    public UnitReactive<User> saveNew(User user) {
        throw new UnsupportedOperationException("Keycloak not support reactive programming!");
    }

    @Override
    public User saveNewSync(User user) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource userResource = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).users();

            //create password
            CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
            credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
            credentialRepresentation.setValue(user.getPassword());
            credentialRepresentation.setTemporary(false);

            //create info user
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setUsername(user.getUsername());
            userRepresentation.setFirstName(user.getName());
            userRepresentation.setEmail(user.getEmail());
            userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));
            userRepresentation.setCreatedTimestamp(System.currentTimeMillis());
            //add attribute
            Map<String, List<String>> attributes = new HashMap<>();
            attributes.put("phoneNumber", Collections.singletonList(user.getPhoneNumber()));
            attributes.put("address", Collections.singletonList(user.getAddress()));
            attributes.put("avatar", Collections.singletonList(user.getAvatar()));
            userRepresentation.setAttributes(attributes);
            userRepresentation.setEnabled(true);
            //create user
            try (Response response = userResource.create(userRepresentation)) {
                if (response.getStatus() == HttpStatus.CREATED.value()) {
                    String id = CreatedResponseUtil.getCreatedId(response);
                    userRepresentation.setId(id);
                    return userMapperOutput.toDomain(userRepresentation);
                } else {
                    log.info(response.getStatus() + ": " + response.getStatusInfo().getReasonPhrase());
                    throw new HandlerGraphQLError("Can't create user", String.valueOf(response.getStatus()), response.getStatusInfo().getReasonPhrase());
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public User deleteUserSync(String id) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        UsersResource userResource = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).users();
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setId(id);
        userResource.get(id).remove();
        return userMapperOutput.toDomain(userRepresentation);
    }

    @Override
    public User updateUserSync(String id, User user) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        UsersResource userResource = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).users();
        try {
            //create password
            CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
            credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
            credentialRepresentation.setValue(user.getPassword());
            credentialRepresentation.setTemporary(false);

            //update user
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setUsername(user.getUsername());
            userRepresentation.setFirstName(user.getName());
            userRepresentation.setEmail(user.getEmail());
            userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));

            //add attribute
            Map<String, List<String>> attributes = new HashMap<>();
            attributes.put("phoneNumber", Collections.singletonList(user.getPhoneNumber()));
            attributes.put("address", Collections.singletonList(user.getAddress()));
            attributes.put("avatar", Collections.singletonList(user.getAvatar()));
            userRepresentation.setAttributes(attributes);

            //update user
            userResource.get(id).update(userRepresentation);
            userRepresentation.setId(id);
            return userMapperOutput.toDomain(userRepresentation);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
