package fitnlu.ntpos.authservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.authservice.adapter.output.keycloak.mapper.RoleMapperOutput;
import fitnlu.ntpos.authservice.adapter.output.keycloak.mapper.UserMapperOutput;
import fitnlu.ntpos.authservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.authservice.application.ports.output.IWriteRolePort;
import fitnlu.ntpos.authservice.application.ports.output.IWriteUserPort;
import fitnlu.ntpos.authservice.domain.exception.HandlerGraphQLError;
import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;

import javax.ws.rs.core.Response;
import java.util.*;

@Adapter
@AllArgsConstructor
@Slf4j
public class WriteRoleAdapter implements IWriteRolePort {
    private final KeycloakUtils keycloakUtils;
    private final RoleMapperOutput roleMapperOutput;

    @Override
    public Role createRoleSync(Role role) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).clients().findByClientId(KeycloakUtils.KEYCLOAK_CLIENT_ID).get(0);
        RoleRepresentation roleRepresentation = new RoleRepresentation();
        roleRepresentation.setName(role.getRoleName());
        roleRepresentation.setDescription(role.getDescription());
        keycloak.realm(KeycloakUtils.KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .create(roleRepresentation);
        return roleMapperOutput.toDomain(roleRepresentation);
    }

    @Override
    public Role deleteRoleSync(String name) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).clients().findByClientId(KeycloakUtils.KEYCLOAK_CLIENT_ID).get(0);
        keycloak.realm(KeycloakUtils.KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .deleteRole(name);
        return Role.builder().roleName(name).build();
    }

    @Override
    public Role updateRoleSync(String name, Role role) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).clients().findByClientId(KeycloakUtils.KEYCLOAK_CLIENT_ID).get(0);
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

        keycloak.realm(KeycloakUtils.KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(name)
                .update(roleRepresentation);
        return Role.builder().roleName(name).build();

    }
}
