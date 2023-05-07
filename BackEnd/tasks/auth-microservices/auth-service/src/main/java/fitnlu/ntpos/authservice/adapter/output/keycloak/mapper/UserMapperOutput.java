package fitnlu.ntpos.authservice.adapter.output.keycloak.mapper;

import fitnlu.ntpos.authservice.adapter.output.keycloak.entities.DateTimeKeycloak;
import fitnlu.ntpos.authservice.adapter.output.keycloak.entities.UserKeycloak;
import fitnlu.ntpos.authservice.domain.model.DateTime;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Mapper;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;
import java.util.UUID;

@Mapper
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
        if(userRepresentation.getAttributes()!=null) {
            List<String> listPN = userRepresentation.getAttributes().get("phoneNumber");
             phoneNumber = listPN == null ? "" : listPN.get(0);
            List<String> listAddress = userRepresentation.getAttributes().get("address");
             address = listAddress == null ? "" : listAddress.get(0);
            List<String> listAvatar = userRepresentation.getAttributes().get("avatar");
             avatar = listAvatar == null ? "" : listAvatar.get(0);
        }
        return User.builder()
                .id(userRepresentation.getId())
                .registeredAt(userRepresentation.getCreatedTimestamp())
                .email(userRepresentation.getEmail())
                .name(userRepresentation.getFirstName())
                .username(userRepresentation.getUsername())
                .phoneNumber(phoneNumber)
                .address(address)
                .avatar(avatar)
                .build();
    }

}
