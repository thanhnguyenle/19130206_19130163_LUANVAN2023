package fitnlu.ntpos.authservice.service;

import fitnlu.ntpos.authservice.dto.*;
import fitnlu.ntpos.authservice.exeption.HandlerGraphQLError;
import fitnlu.ntpos.authservice.model.User;
import fitnlu.ntpos.authservice.repository.KeycloakUtils;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.GroupsResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.authorization.client.AuthzClient;
import org.keycloak.authorization.client.Configuration;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@RefreshScope
public class AuthService {
    @NonNull
    private KeycloakUtils keycloakUtils;
    @Value("${keycloak.auth-server-url}")
    private String KEYCLOAK_AUTH_SERVER_URL;
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM ;
    //set role for client-id in Service Account Role => Client Role => realm-management => all row
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID ;
    @Value("${keycloak.credentials.secret}")
    private String KEYCLOAK_CLIENT_SECRET ;
    private AuthzClient authzClient;

    private AuthzClient authzClient() {
        if(authzClient == null) {
            try {
                Map<String, Object> clientCredentials = new HashMap<>();
                clientCredentials.put("secret", KEYCLOAK_CLIENT_SECRET);
                clientCredentials.put("grant_type", "password");
                Configuration configuration =
                        new Configuration(KEYCLOAK_AUTH_SERVER_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID,
                                clientCredentials, null);
                return AuthzClient.create(configuration);
            } catch (Exception e) {
                log.error("Login fail", e);
                throw new HandlerGraphQLError(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR), "Login fail");
            }
        }else return authzClient;
    }
    public LoginOutput login(LoginInput loginInput){
        AccessTokenResponse response;
        try {
            AuthzClient authzClient = authzClient();
            response = authzClient.obtainAccessToken(loginInput.getEmail(),
                            loginInput.getPassword());
            return LoginOutput.builder()
                    .accessToken(response.getToken())
                    .accessTokenExpiration(response.getExpiresIn())
                    .refreshToken(response.getRefreshToken())
                    .refreshTokenExpiration(response.getRefreshExpiresIn())
                    .build();
        }catch (Exception e){
            log.error("Login fail",e);
            throw new HandlerGraphQLError(String.valueOf(401),"Login fail");
        }

    }
    public LoginOutput refreshToken(RefreshTokenInput refreshTokenInput){
        try {
            Map<String, Object> clientCredentials = new HashMap<>();
            clientCredentials.put("secret", KEYCLOAK_CLIENT_SECRET);
            clientCredentials.put("grant_type", "refresh_token");
            clientCredentials.put("refresh_token", refreshTokenInput.getRefreshToken());
            Configuration configuration =
                    new Configuration(KEYCLOAK_AUTH_SERVER_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID,
                            clientCredentials, null);
            AuthzClient authzClient = AuthzClient.create(configuration);
            AccessTokenResponse response = authzClient.obtainAccessToken();
            return LoginOutput.builder()
                    .accessToken(response.getToken())
                    .accessTokenExpiration(response.getExpiresIn())
                    .refreshToken(response.getRefreshToken())
                    .refreshTokenExpiration(response.getRefreshExpiresIn())
                    .build();
        } catch (Exception e) {
            log.error("Refresh token fail", e);
            throw new HandlerGraphQLError(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR), "Refresh token fail");
        }
    }

    public UpdatePasswordOutput updatePassword(UpdatePasswordInput updatePasswordInput){
        try {
            //authentication with old password
            LoginOutput loginOutput = login(LoginInput.builder().email(updatePasswordInput.getEmail()).password(updatePasswordInput.getOldPassword()).build());
            if(loginOutput.getAccessToken()!=null) {
                Keycloak keycloak = keycloakUtils.getKeycloakInstance();
                CredentialRepresentation cred = new CredentialRepresentation();
                cred.setType(CredentialRepresentation.PASSWORD);
                cred.setValue(updatePasswordInput.getPassword());
                cred.setTemporary(false);
                keycloak.realm(KEYCLOAK_REALM).users().get(updatePasswordInput.getId()).resetPassword(cred);
                return UpdatePasswordOutput.builder()
                        .accessToken(loginOutput.getAccessToken())
                        .accessTokenExpiration(loginOutput.getAccessTokenExpiration())
                        .refreshToken(loginOutput.getRefreshToken())
                        .refreshTokenExpiration(loginOutput.getRefreshTokenExpiration())
                        .build();
            }else throw new HandlerGraphQLError(String.valueOf(401),"Update password fail");
        }catch (Exception e){
            log.error("Update password fail",e);
            throw new HandlerGraphQLError(java.lang.String.valueOf(401),"Update password fail");
        }
       }
       public UserRepresentation searchUserByEmail(String email){
           Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
           UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
           List<UserRepresentation> userRepresentation = usersResource.list();
           assert userRepresentation != null;
           userRepresentation = userRepresentation.stream().filter(user -> user.getEmail().contains(email)).toList();
          if (userRepresentation.stream().findFirst().isPresent()){
              return userRepresentation.stream().findFirst().get();
          }else{
                return null;
          }
       }
       public User me(ResetPasswordInput resetPasswordInput) {
           Keycloak keycloak = keycloakUtils.getKeycloakInstance();
           UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
           UserRepresentation userRepresentation = usersResource.get(resetPasswordInput.getId()).toRepresentation();
           if(userRepresentation == null) return null;
           String phoneNumber = "", address = "", avatar = "";
           long registeredAt = 0L;
           if(userRepresentation.getAttributes()!=null) {
               List<String> listPN = userRepresentation.getAttributes().get("phoneNumber");
               phoneNumber = listPN == null ? "" : listPN.get(0);
               List<String> listAddress = userRepresentation.getAttributes().get("address");
               address = listAddress == null ? "" : listAddress.get(0);
               List<String> listAvatar = userRepresentation.getAttributes().get("avatar");
               avatar = listAvatar == null ? "" : listAvatar.get(0);
           }
           if(userRepresentation.getCreatedTimestamp() != null){
               registeredAt = userRepresentation.getCreatedTimestamp();
           }
           return User.builder()
                   .id(userRepresentation.getId())
                   .registeredAt(registeredAt)
                   .email(userRepresentation.getEmail())
                   .name(userRepresentation.getFirstName())
                   .username(userRepresentation.getUsername())
                   .phoneNumber(phoneNumber)
                   .address(address)
                   .avatar(avatar)
                   .build();
       }
    public ForgetPasswordOutput sendResetPassword(ForgetPasswordInput resetPasswordInput){
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            UserRepresentation userRepresentation = searchUserByEmail(resetPasswordInput.getEmail());
            usersResource.get(userRepresentation.getId())
                    .executeActionsEmail(List.of("UPDATE_PASSWORD"));
            return ForgetPasswordOutput.builder()
                    .success(true)
                    .build();
        }catch (Exception e){
            log.error("Send reset password fail",e);
            return ForgetPasswordOutput.builder()
                    .success(false)
                    .build();
        }
    }

    public ResetPasswordOutput sendActiveEmail(ResetPasswordInput resetPasswordInput){
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            usersResource.get(resetPasswordInput.getId())
                    .executeActionsEmail(List.of("VERIFY_EMAIL"));
            return ResetPasswordOutput.builder()
                    .success(true)
                    .build();
        }catch (Exception e){
            log.error("Send reset password fail",e);
            return ResetPasswordOutput.builder()
                    .success(false)
                    .build();
        }
    }

    public RegisterOutput register(RegisterInput registerInput) {
        Response response = null;
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();

            //create password
            CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
            credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
            credentialRepresentation.setValue(registerInput.getPassword());
            credentialRepresentation.setTemporary(false);

            //create info user
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setUsername(registerInput.getUsername());
            userRepresentation.setFirstName(registerInput.getName());
            userRepresentation.setEmail(registerInput.getEmail());
            userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));
            userRepresentation.setCreatedTimestamp(System.currentTimeMillis());
            //add attribute
            Map<String, List<String>> attributes = new HashMap<>();
            attributes.put("phoneNumber", Collections.singletonList(registerInput.getPhoneNumber()));
            attributes.put("address", Collections.singletonList(registerInput.getAddress()));
            attributes.put("avatar", Collections.singletonList(registerInput.getAvatar()));
            userRepresentation.setAttributes(attributes);
            userRepresentation.setEnabled(true);
            //create user
            response = userResource.create(userRepresentation);
            if (response.getStatus() == HttpStatus.CREATED.value()) {
                String id = CreatedResponseUtil.getCreatedId(response);
                userRepresentation.setId(id);
              return RegisterOutput.builder()
                      .id(id).build();
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
    private User deleteUserSync(String id) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setId(id);
            try (Response response = userResource.delete(id)) {
                if (response.getStatus() == HttpStatus.NO_CONTENT.value()) {
                    return User.builder().id(id).build();
                } else {
                    log.info(response.getStatus() + ": " + response.getStatusInfo().getReasonPhrase());
                    throw new HandlerGraphQLError( String.valueOf(response.getStatus()), response.getStatusInfo().getReasonPhrase());
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
