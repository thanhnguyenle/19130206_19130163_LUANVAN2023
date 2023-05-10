package fitnlu.ntpos.userservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.RoleMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.userservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Value;

@Adapter
@RequiredArgsConstructor
@Slf4j
public class WriteRoleAdapter implements IWriteRolePort {
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM;
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID;
    private final KeycloakUtils keycloakUtils;
    private final RoleMapperOutput roleMapperOutput;

    @Override
    public Role createRoleSync(Role role) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        RoleRepresentation roleRepresentation = new RoleRepresentation();
        roleRepresentation.setName(role.getRoleName());
        roleRepresentation.setDescription(role.getDescription());
        keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .create(roleRepresentation);
        return roleMapperOutput.toDomain(roleRepresentation);
    }

    @Override
    public Role deleteRoleSync(String name) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .deleteRole(name);
        return Role.builder().roleName(name).build();
    }

    @Override
    public Role updateRoleSync(String name, Role role) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        RoleRepresentation roleRepresentation = new RoleRepresentation();
        roleRepresentation.setName(role.getRoleName());
        roleRepresentation.setDescription(role.getDescription());
//        List<RoleRepresentation> composites = new LinkedList<>();
//        composites.add(keycloak
//                .realm(KeycloakUtils.KEYCLOAK_REALM)
//                .roles()
//                .get("offline_access")
//                .toRepresentation()
//        );

        keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(name)
                .update(roleRepresentation);
        return Role.builder().roleName(name).build();

    }
}
