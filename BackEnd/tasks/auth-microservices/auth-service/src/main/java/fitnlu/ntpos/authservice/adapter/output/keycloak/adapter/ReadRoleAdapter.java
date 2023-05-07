package fitnlu.ntpos.authservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.authservice.adapter.output.keycloak.mapper.RoleMapperOutput;
import fitnlu.ntpos.authservice.adapter.output.keycloak.mapper.UserMapperOutput;
import fitnlu.ntpos.authservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.authservice.application.ports.output.IReadRolePort;
import fitnlu.ntpos.authservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.authservice.domain.model.Role;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

@Adapter
@AllArgsConstructor
public class ReadRoleAdapter implements IReadRolePort {
    private final KeycloakUtils keycloakUtils;
    private final RoleMapperOutput roleMapperOutput;

    @Override
    public List<Role> findAllSync() {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).clients().findByClientId(KeycloakUtils.KEYCLOAK_CLIENT_ID).get(0);
        return keycloak.realm(KeycloakUtils.KEYCLOAK_REALM)
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
        ClientRepresentation clientRepresentation = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).clients().findByClientId(KeycloakUtils.KEYCLOAK_CLIENT_ID).get(0);
        RoleRepresentation roleRepresentation = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(name)
                .toRepresentation();
        System.out.println(clientRepresentation.getId());
        System.out.println(KeycloakUtils.KEYCLOAK_CLIENT_ID);
        return roleMapperOutput.toDomain(roleRepresentation);
    }
}
