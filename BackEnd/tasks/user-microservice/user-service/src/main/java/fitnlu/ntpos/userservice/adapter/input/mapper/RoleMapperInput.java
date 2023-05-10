package fitnlu.ntpos.authservice.adapter.input.mapper;

import fitnlu.ntpos.authservice.adapter.input.dto.RoleInput;
import fitnlu.ntpos.authservice.adapter.input.dto.RoleOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Mapper;
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
