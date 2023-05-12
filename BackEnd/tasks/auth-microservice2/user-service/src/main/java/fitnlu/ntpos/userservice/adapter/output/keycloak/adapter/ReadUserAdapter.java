package fitnlu.ntpos.userservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.GroupMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.RoleMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.UserMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.userservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.GroupsResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Adapter
@RequiredArgsConstructor
public class ReadUserAdapter implements IReadUserPort {
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM;
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID;
    private final KeycloakUtils keycloakUtils;
    private final UserMapperOutput userMapperOutput;
    private final RoleMapperOutput roleMapperOutput;
    private final GroupMapperOutput groupMapperOutput;

    @Override
    public CollectionReactive<User> findAll() {
        throw new UnsupportedOperationException("Keycloak not support reactive programming!");
    }

    @Override
    public List<User> findAllSync() {
        try{
            //not closed keycloak instance because keycloak will auto close after .. minutes (config)
            Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            List<UserRepresentation> userRepresentation = usersResource.list();
            assert userRepresentation != null;
            return userRepresentation.stream().map(user -> {
                List<RoleRepresentation> list =  usersResource.get(user.getId()).roles().clientLevel(clientRepresentation.getId()).listEffective();
                User userDomain = userMapperOutput.toDomain(user);
                userDomain.setRoles(list.stream().map(roleMapperOutput::toDomain).toList());
                List<GroupRepresentation> groupRepresentationList = usersResource.get(user.getId()).groups();
                userDomain.setGroups(groupRepresentationList.stream().map(groupMapperOutput::toDomain).toList());
                return userDomain;
            }).toList();
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
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            UsersResource userResource = keycloak.realm(KEYCLOAK_REALM).users();
            UserRepresentation userRepresentation = userResource.get(id).toRepresentation();
            //get ROLE of user
            List<RoleRepresentation> list =  usersResource.get(id).roles().clientLevel(clientRepresentation.getId()).listEffective();
            User userDomain = userMapperOutput.toDomain(userRepresentation);
            userDomain.setRoles(list.stream().map(roleMapperOutput::toDomain).toList());
            List<GroupRepresentation> groupRepresentationList = usersResource.get(id).groups();
            userDomain.setGroups(groupRepresentationList.stream().map(groupMapperOutput::toDomain).toList());
            return userDomain;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public List<User> findAllUserByGroupName(String groupName) {
        List<UserRepresentation> userRepresentation = null;
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            GroupsResource groupsResource = keycloak.realm(KEYCLOAK_REALM).groups();
            Optional<GroupRepresentation> groupRepresentation = keycloak.realm(KEYCLOAK_REALM)
                    .groups()
                    .groups().stream().filter(group -> group.getName().equals(groupName)).findFirst();
            if (groupRepresentation.isPresent()) {
                userRepresentation = groupsResource.group(groupRepresentation.get().getId()).members();
                assert userRepresentation != null;
                return userRepresentation.stream().map(user -> {
                    List<RoleRepresentation> list =  usersResource.get(user.getId()).roles().clientLevel(clientRepresentation.getId()).listEffective();
                    User userDomain = userMapperOutput.toDomain(user);
                    userDomain.setRoles(list.stream().map(roleMapperOutput::toDomain).toList());
                    List<GroupRepresentation> groupRepresentationList = usersResource.get(user.getId()).groups();
                    userDomain.setGroups(groupRepresentationList.stream().map(groupMapperOutput::toDomain).toList());
                    return userDomain;
                }).toList();
            }else {
                return List.of();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
       return null;
    }

    @Override
    public List<User> findAllUserByGroupID(String groupID) {
        List<UserRepresentation> userRepresentation = null;
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            GroupsResource groupsResource = keycloak.realm(KEYCLOAK_REALM).groups();
            userRepresentation = groupsResource.group(groupID).members();
            assert userRepresentation != null;
            return userRepresentation.stream().map(user -> {
                List<RoleRepresentation> list =  usersResource.get(user.getId()).roles().clientLevel(clientRepresentation.getId()).listEffective();
                User userDomain = userMapperOutput.toDomain(user);
                userDomain.setRoles(list.stream().map(roleMapperOutput::toDomain).toList());
                List<GroupRepresentation> groupRepresentationList = usersResource.get(user.getId()).groups();
                userDomain.setGroups(groupRepresentationList.stream().map(groupMapperOutput::toDomain).toList());
                return userDomain;
            }).toList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
