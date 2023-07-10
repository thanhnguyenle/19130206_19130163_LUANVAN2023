package fitnlu.ntpos.userservice.adapter.input.mapper;

import fitnlu.ntpos.userservice.adapter.input.dto.*;
import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Mapper;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.List;

@Mapper
@RequiredArgsConstructor
public class GroupMapperInput {
    private final UserMapperInput userMapperInput;
    private final RoleMapperInput roleMapperInput;
    public GroupScalarOutput toDTO(boolean success){
        return GroupScalarOutput.builder().success(success).build();
    }
    public static Group toGroupFromID (String id){
        return Group.builder()
                .id(id)
                .build();
    }
    public static GroupOutput toDTO(Group role) {
            List<RoleOutput> roleInputs = role.getRoles()!=null?role.getRoles().stream().map(RoleMapperInput::toDTO).toList(): Collections.emptyList();
            List<UserOutput> userInputs = role.getUsers()!=null?role.getUsers().stream().map(UserMapperInput::toDTO).toList(): Collections.emptyList();
                    return GroupOutput.builder()
                            .id(role.getId())
                            .name(role.getName())
                            .users(userInputs)
                            .roles(roleInputs)
                            .description(role.getDescription())
                            .build();
    }

    public Group toDomainFromSaveBody(GroupInput roleInput){
        List<Role> roleInputs = roleInput.roles()!=null?roleInput.roles().stream().map(RoleMapperInput::toDomainFromName).toList(): Collections.emptyList();
        List<User> userInputs = roleInput.users()!=null?roleInput.users().stream().map(UserMapperInput::toDomainFromID).toList(): Collections.emptyList();
        return Group.builder()
                .name(roleInput.name())
                .users(userInputs)
                .roles(roleInputs)
                .description(roleInput.description())
                .build();
    }
}
