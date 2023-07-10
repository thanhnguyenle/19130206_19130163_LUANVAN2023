package fitnlu.ntpos.userservice.adapter.output.keycloak.mapper;

import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import fitnlu.ntpos.userservice.adapter.output.keycloak.entities.UserKeycloak;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Mapper;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Map;

@Mapper
@RequiredArgsConstructor
public class UserMapperOutput {
    public UserKeycloak toEntity(User user){
        return UserKeycloak.builder()
                .userName(user.getUsername())
                .email(user.getEmail())
                .firstname(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .password(user.getPassword())
                .build();
    }

    public User toDomain(UserKeycloak userEntity){
        return User.builder()
                .username(userEntity.getUserName())
                .email(userEntity.getEmail())
                .name(userEntity.getFirstname())
                .phoneNumber(userEntity.getPhoneNumber())
                .password(userEntity.getPassword())
                .build();
    }
    public User toDomain(UserRepresentation userRepresentation){
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

}
