package fitnlu.ntpos.userservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.UserMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.userservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.userservice.domain.exception.HandlerGraphQLError;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import javax.ws.rs.core.Response;
import java.util.*;
import java.util.stream.Collectors;

@Adapter
@RequiredArgsConstructor
@Slf4j
public class WriteUserAdapter implements IWriteUserPort {
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM;
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID;
    private final KeycloakUtils keycloakUtils;
    private final UserMapperOutput userMapperOutput;

    @Override
    public UnitReactive<User> saveNew(User user) {
        throw new UnsupportedOperationException("Keycloak not support reactive programming!");
    }
    public boolean addUserToGroup(String id, String groupID) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        keycloak.realm(KEYCLOAK_REALM).users().get(id).joinGroup(groupID);
        return true;
    }

    @Override
    public User saveNewSync(User user) {
        Response response = null;
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();

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
            response = userResource.create(userRepresentation);
                if (response.getStatus() == HttpStatus.CREATED.value()) {
                    String id = CreatedResponseUtil.getCreatedId(response);
                    userRepresentation.setId(id);
                    //add role
                    User userCreated = userMapperOutput.toDomain(userRepresentation);
                    if(user.getRoles()!=null)
                        addRoleToUser(id, user.getRoles().stream().map(Role::getRoleName).toList());
                    if(user.getGroups()!=null)
                        user.getGroups().forEach(group->{
                            addUserToGroup(id, group.getId());
                        });
                    return userCreated;
                } else {
                    log.info(response.getStatus() + ": " + response.getStatusInfo().getReasonPhrase());
                    throw new HandlerGraphQLError( String.valueOf(response.getStatus()), response.getStatusInfo().getReasonPhrase());
                }
        } catch (Exception e) {
            //rollback
            assert response != null;
            if(response.getStatus() == HttpStatus.CREATED.value()){
                String id = CreatedResponseUtil.getCreatedId(response);
                deleteUserSync(id);
            }
            e.printStackTrace();
            throw new RuntimeException(e);
        }finally {
            if(response!=null) response.close();
        }
    }

    @Override
    public User deleteUserSync(String id) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setId(id);
            try (Response response = userResource.delete(id)) {
                if (response.getStatus() == HttpStatus.NO_CONTENT.value()) {
                    return userMapperOutput.toDomain(userRepresentation);
                } else {
                    log.info(response.getStatus() + ": " + response.getStatusInfo().getReasonPhrase());
                    throw new HandlerGraphQLError( String.valueOf(response.getStatus()), response.getStatusInfo().getReasonPhrase());
                }
            }
//            userResource.get(id).remove();
//            return userMapperOutput.toDomain(userRepresentation);
//        } catch (Exception e) {
//            throw new HandlerGraphQLError( String.valueOf(response.getStatus()), response.getStatusInfo().getReasonPhrase());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public User updateUserSync(String id, User user) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();
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
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean addRoleToUser(String userid, List<String> roleName) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        List<RoleRepresentation> roleRepresentations = roleName.stream().map(role -> keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(role)
                .toRepresentation()).toList();
        userResource.get(userid).roles().clientLevel(clientRepresentation.getId()).add(roleRepresentations);
        return true;
    }

    @Override
    public boolean removeRoleFromUser(String userid, List<String>  roleName) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        List<RoleRepresentation> roleRepresentations = roleName.stream().map(role -> keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(role)
                .toRepresentation()).toList();
        userResource.get(userid).roles().clientLevel(clientRepresentation.getId()).remove(roleRepresentations);
        return true;
    }

    @Override
    public boolean lockUser(String id) {
        return false;
    }

    @Override
    public boolean unlockUser(String id) {
        return false;
    }

    @Override
    public boolean addBatchUsers(List<User> users) {
        for(User user: users){
            User checkUser = saveNewSync(user);
            if(checkUser==null) return false;
        }
        return true;
    }
}
