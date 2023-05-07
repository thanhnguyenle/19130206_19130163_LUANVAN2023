package fitnlu.ntpos.authservice.adapter.output.keycloak.mapper;

import fitnlu.ntpos.authservice.adapter.output.keycloak.entities.UserKeycloak;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Mapper;
import org.keycloak.representations.idm.UserRepresentation;

@Mapper
public class RoleMapperOutput {
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
        return User.builder()
                .id(userRepresentation.getId())
                .registeredAt(userRepresentation.getCreatedTimestamp())
                .build();
    }

}
