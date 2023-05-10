package fitnlu.ntpos.userservice.adapter.output.keycloak.mapper;

import fitnlu.ntpos.userservice.adapter.output.keycloak.entities.RoleKeycloak;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.infrastructure.annotations.Mapper;
import org.keycloak.representations.idm.RoleRepresentation;

@Mapper
public class GroupMapperOutput {
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
        Role role= Role.builder()
                .roleName(roleRepresentation.getName())
                .description(roleRepresentation.getDescription())
                //.compositeRoles(roleRepresentation.getComposites().getRealm().stream().toList())
                .build();
        System.out.println(role.getRoleName()+" "+role.getDescription());
        return role;
    }

}
