package fitnlu.ntpos.authservice.adapter.output.keycloak.mapper;

import fitnlu.ntpos.authservice.adapter.output.keycloak.entities.RoleKeycloak;
import fitnlu.ntpos.authservice.adapter.output.keycloak.entities.UserKeycloak;
import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Mapper;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

@Mapper
public class RoleMapperOutput {
    public RoleKeycloak toEntity(Role role){
        return RoleKeycloak.builder()
                .roleName(role.getRoleName())
                .description(role.getDescription())
                .compositeRoles(role.getCompositeRoles())
                .build();
    }

    public Role toDomain(RoleKeycloak roleKeycloak){
        return Role.builder()
                .roleName(roleKeycloak.getRoleName())
                .description(roleKeycloak.getDescription())
                .compositeRoles(roleKeycloak.getCompositeRoles())
                .build();
    }
    public Role toDomain(RoleRepresentation roleRepresentation){
        return Role.builder()
                .roleName(roleRepresentation.getName())
                .description(roleRepresentation.getDescription())
                //.compositeRoles(roleRepresentation.getComposites().getRealm().stream().toList())
                .build();
    }

}
