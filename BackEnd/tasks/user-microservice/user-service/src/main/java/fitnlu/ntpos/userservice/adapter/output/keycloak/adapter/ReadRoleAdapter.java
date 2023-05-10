package fitnlu.ntpos.userservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.RoleMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.userservice.application.ports.output.IReadRolePort;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.GroupsResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Value;
import java.util.List;
import java.util.Optional;

@Adapter
@RequiredArgsConstructor
public class ReadRoleAdapter implements IReadRolePort {
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM;
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID;
    private final KeycloakUtils keycloakUtils;
    private final RoleMapperOutput roleMapperOutput;

    @Override
    public List<Role> findAllSync() {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        return keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .list()
                .stream()
                .map(roleMapperOutput::toDomain)
                .toList();
    }

    @Override
    public Role findByNameSync(String name) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        RoleRepresentation roleRepresentation = keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(name)
                .toRepresentation();
        return roleMapperOutput.toDomain(roleRepresentation);
    }

    @Override
    public List<Role> findByUserID(String id) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
        UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
        //getting client
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        //assigning to user
        List<RoleRepresentation> list =  usersResource.get(id).roles().clientLevel(clientRepresentation.getId()).listEffective();
        return list.stream().map(roleMapperOutput::toDomain).toList();
    }

    @Override
    public List<Role> findRoleOfGroupName(String name) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            GroupsResource groupsResource = keycloak.realm(KEYCLOAK_REALM).groups();
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            Optional<GroupRepresentation> groupRepresentation = keycloak.realm(KEYCLOAK_REALM)
                    .groups()
                    .groups().stream().filter(group -> group.getName().equals(name)).findFirst();
            if (groupRepresentation.isPresent()) {
                List<RoleRepresentation> groupRep = groupsResource.group(groupRepresentation.get().getId()).roles().clientLevel(clientRepresentation.getId()).listAll();
                return groupRep.stream().map(roleMapperOutput::toDomain).toList();
            }else {
                return List.of();
            }
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Role> findRoleOfGroupID(String id) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            GroupsResource groupsResource = keycloak.realm(KEYCLOAK_REALM).groups();
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            List<RoleRepresentation> groupRep = groupsResource.group(id).roles().clientLevel(clientRepresentation.getId()).listAll();
            return groupRep.stream().map(roleMapperOutput::toDomain).toList();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

}
