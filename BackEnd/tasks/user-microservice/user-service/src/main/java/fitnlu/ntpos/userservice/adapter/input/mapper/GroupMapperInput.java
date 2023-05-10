package fitnlu.ntpos.userservice.adapter.input.mapper;

import fitnlu.ntpos.userservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.userservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.infrastructure.annotations.Mapper;
import lombok.NoArgsConstructor;

@Mapper
@NoArgsConstructor
public class RoleMapperInput {
    public RoleOutput toDTO(Role role) {
        return RoleOutput.builder().roleName(role.getRoleName()).description(role.getDescription()).compositeRoles(role.getCompositeRoles()).build();
    }

    public Role toDomainFromSaveBody(RoleInput roleInput){
        return Role.builder().roleName(roleInput.roleName()).description(roleInput.description()).compositeRoles(roleInput.compositeRoles()).build();
    }
}
