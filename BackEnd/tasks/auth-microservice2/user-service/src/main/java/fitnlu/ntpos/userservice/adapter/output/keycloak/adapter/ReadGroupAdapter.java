package fitnlu.ntpos.userservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.GroupMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.userservice.application.ports.output.IReadGroupPort;
import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.GroupsResource;
import org.keycloak.representations.idm.GroupRepresentation;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Optional;

@Adapter
@RequiredArgsConstructor
public class ReadGroupAdapter implements IReadGroupPort {
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM;
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID;
    private final KeycloakUtils keycloakUtils;
    private final GroupMapperOutput groupMapperOutput;
    private final ReadRoleAdapter readRoleAdapter;
    private final ReadUserAdapter readUserAdapter;
    @Override
    public List<Group> findAllSync() {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
            GroupsResource groupsResource = keycloak.realm(KEYCLOAK_REALM).groups();
            List<GroupRepresentation> listGroups = groupsResource.groups();
            return listGroups.stream().map(groupRepresentation -> {
                Group group = groupMapperOutput.toDomain(groupRepresentation);
                group.setUsers(readUserAdapter.findAllUserByGroupID(groupRepresentation.getId()));
                group.setRoles(readRoleAdapter.findRoleOfGroupID(groupRepresentation.getId()));
                return group;
            }).toList();
        }catch (Exception e){
            e.printStackTrace();
        }
      return null;
    }

    @Override
    public Group findByNameSync(String name) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            Optional<GroupRepresentation> groupRepresentation = keycloak.realm(KEYCLOAK_REALM)
                    .groups()
                    .groups().stream().filter(group -> group.getName().equals(name)).findFirst();
            if(groupRepresentation.isPresent()){
                Group group = groupMapperOutput.toDomain(groupRepresentation.get());
                group.setUsers(readUserAdapter.findAllUserByGroupID(groupRepresentation.get().getId()));
                group.setRoles(readRoleAdapter.findRoleOfGroupID(groupRepresentation.get().getId()));
                return group;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Group findByGroupID(String id) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            GroupRepresentation groupRepresentation = keycloak.realm(KEYCLOAK_REALM)
                    .groups().group(id).toRepresentation();
            Group group = groupMapperOutput.toDomain(groupRepresentation);
            group.setUsers(readUserAdapter.findAllUserByGroupID(groupRepresentation.getId()));
            group.setRoles(readRoleAdapter.findRoleOfGroupID(groupRepresentation.getId()));
            return group;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Group> findByUserID(String id) {
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
            List<GroupRepresentation> list = keycloak.realm(KEYCLOAK_REALM).users().get(id).groups();
            return list.stream().map(groupRepresentation -> {
                Group group = groupMapperOutput.toDomain(groupRepresentation);
                group.setUsers(readUserAdapter.findAllUserByGroupID(groupRepresentation.getId()));
                group.setRoles(readRoleAdapter.findRoleOfGroupID(groupRepresentation.getId()));
                return group;
            }).toList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
