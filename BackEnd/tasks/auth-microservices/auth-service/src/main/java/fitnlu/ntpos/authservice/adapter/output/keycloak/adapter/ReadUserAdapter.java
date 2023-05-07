package fitnlu.ntpos.authservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.authservice.adapter.output.keycloak.mapper.UserMapperOutput;
import fitnlu.ntpos.authservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.authservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.authservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.core.env.Environment;


import java.util.List;
import java.util.UUID;

@Adapter
@AllArgsConstructor
public class ReadUserAdapter implements IReadUserPort {
    private final KeycloakUtils keycloakUtils;
    private final UserMapperOutput userMapperOutput;

    @Override
    public CollectionReactive<User> findAll() {
        throw new UnsupportedOperationException("Keycloak not support reactive programming!");
    }

    @Override
    public List<User> findAllSync() {
        try{
            //not closed keycloak instance because keycloak will auto close after .. minutes (config)
            Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
            UsersResource userResource = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).users();
            List<UserRepresentation> userRepresentation = userResource.list();
            return userRepresentation.stream().map(userMapperOutput::toDomain).toList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return List.of();
    }

    @Override
    public UnitReactive<User> findById(String id) {
        throw new UnsupportedOperationException("Keycloak not support reactive programming!");
    }

    @Override
    public User findByIdSync(String id) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource userResource = keycloak.realm(KeycloakUtils.KEYCLOAK_REALM).users();
            UserRepresentation userRepresentation = userResource.get(id).toRepresentation();
            return userMapperOutput.toDomain(userRepresentation);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
