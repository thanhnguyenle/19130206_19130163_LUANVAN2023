package fitnlu.ntpos.userservice.adapter.input.mapper;

import fitnlu.ntpos.userservice.adapter.input.dto.*;
import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.RoleMapperOutput;
import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Mapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

@Mapper
@AllArgsConstructor
public class UserMapperInput {

    public UserScalarOutput toDTO(boolean bool){
        return UserScalarOutput.builder().success(bool).build();
    }
    public static User toDomainFromID(String id){
        return User.builder()
                .id(id)
                .build();
    }
    public static UserOutput toDTO(User user) {
        List<RoleOutput> roles = user.getRoles()!=null?user.getRoles().stream().map(RoleMapperInput::toDTO).toList(): Collections.emptyList();
        List<GroupOutput> groups = user.getGroups()!=null?user.getGroups().stream().map(GroupMapperInput::toDTO).toList(): Collections.emptyList();
            return UserOutput.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber())
                    .address(user.getAddress())
                    .avatar(user.getAvatar())
                    .roles(roles)
                    .groups(groups)
                    .registeredAt(user.getRegisteredAt())
                    .build();
    }

    public User toDomainFromSaveBody(UserInput userInput){
        List<Role> roles = userInput.roles()!=null?userInput.roles().stream().map(RoleMapperInput::toDomainFromName).toList(): Collections.emptyList();
        List<Group> groups = userInput.groups()!=null? userInput.groups().stream().map(GroupMapperInput::toGroupFromID).toList(): Collections.emptyList();
            return User.builder()
                    .name(userInput.name())
                    .username(userInput.username())
                    .password(userInput.password())
                    .email(userInput.email())
                    .phoneNumber(userInput.phoneNumber())
                    .address(userInput.address())
                    .avatar(userInput.avatar())
                    .roles(roles)
                    .groups(groups)
                    .build();
    }
}
