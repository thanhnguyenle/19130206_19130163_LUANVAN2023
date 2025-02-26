package fitnlu.ntpos.userservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.GroupMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.userservice.application.ports.output.IReadGroupPort;
import fitnlu.ntpos.userservice.application.ports.output.IWriteGroupPort;
import fitnlu.ntpos.userservice.domain.exception.HandlerGraphQLError;
import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Value;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;

@Adapter
@RequiredArgsConstructor
public class WriteGroupAdapter implements IWriteGroupPort {
    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM;
    @Value("${keycloak.resource}")
    private String KEYCLOAK_CLIENT_ID;
    private final KeycloakUtils keycloakUtils;
    private final GroupMapperOutput groupMapperOutput;
    @Override
    public Group createGroupSync(Group group) {
        Response response =null;
        try {
            Keycloak keycloak = keycloakUtils.getKeycloakInstance();
            GroupRepresentation groupRepresentation = groupMapperOutput.toRepresentation(group);
            groupRepresentation.setAttributes(Collections.singletonMap("description", Collections.singletonList(group.getDescription())));
            response = keycloak.realm(KEYCLOAK_REALM).groups().add(groupRepresentation);
                if (response.getStatus() == 201) {
                    //group created
                    Group groupDomain = groupMapperOutput.toDomain(groupRepresentation);
                    String id = CreatedResponseUtil.getCreatedId(response);
                    addRoleToGroup(group.getRoles().stream().map(Role::getRoleName).toList(),id);
                    addUserToGroup(group.getUsers().stream().map(User::getId).toList(),id);
                    groupDomain.setId(id);
                    return groupDomain;
                }else {
                    throw new HandlerGraphQLError(String.valueOf(response.getStatus()), response.getStatusInfo().getReasonPhrase());
                }
        }catch (Exception e) {
            //rollback
            if(response!=null){
                if(response.getStatus()==201){
                    String id = CreatedResponseUtil.getCreatedId(response);
                    //roll back
                    deleteGroupSync(id);
                }
            }

            e.printStackTrace();
            throw new RuntimeException(e);
        }finally {
            if(response!=null){
                response.close();
            }
        }
    }

    @Override
    public Group deleteGroupSync(String id) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        keycloak.realm(KEYCLOAK_REALM).groups().group(id).remove();
        return Group.builder()
                .id(id)
                .build();
    }

    @Override
    public Group updateGroupSync(String name, Group group) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        GroupRepresentation groupRepresentationUpdate = groupMapperOutput.toRepresentation(group);
        keycloak.realm(KEYCLOAK_REALM).groups().group(name).update(groupRepresentationUpdate);
        groupRepresentationUpdate.setId(name);
        return groupMapperOutput.toDomain(groupRepresentationUpdate);
    }

    @Override
    public boolean addUserToGroup(List<String> userIDs, String groupID) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        userIDs.forEach(id ->{
            keycloak.realm(KEYCLOAK_REALM).users().get(id).joinGroup(groupID);
        });
        return true;
    }

    @Override
    public boolean removeUserFromGroup(List<String> userIDs, String groupID) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        userIDs.forEach(id->{
            keycloak.realm(KEYCLOAK_REALM).users().get(id).leaveGroup(groupID);
        });
        return true;
    }

    @Override
    public boolean addRoleToGroup(List<String> roleNames, String groupID) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        List<RoleRepresentation> roleRepresentationList = roleNames.stream().map(role -> keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(role)
                .toRepresentation()).toList();
        keycloak.realm(KEYCLOAK_REALM).groups().group(groupID).roles().clientLevel(clientRepresentation.getId()).add(roleRepresentationList);
        return true;
    }

    @Override
    public boolean removeRoleFromGroup(List<String> roleNames, String groupID) {
        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
        List<RoleRepresentation> roleRepresentationList = roleNames.stream().map(role -> keycloak.realm(KEYCLOAK_REALM)
                .clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(role)
                .toRepresentation()).toList();
        keycloak.realm(KEYCLOAK_REALM).groups().group(groupID).roles().clientLevel(clientRepresentation.getId()).remove(roleRepresentationList);
        return true;
    }
}
