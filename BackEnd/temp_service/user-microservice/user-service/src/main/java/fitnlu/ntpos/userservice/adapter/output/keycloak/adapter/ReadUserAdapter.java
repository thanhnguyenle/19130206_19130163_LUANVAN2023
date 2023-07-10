package fitnlu.ntpos.userservice.adapter.output.keycloak.adapter;

import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.GroupMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.RoleMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.mapper.UserMapperOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.utils.KeycloakUtils;
import fitnlu.ntpos.userservice.application.ports.output.IReadUserPort;
import fitnlu.ntpos.userservice.domain.model.DateTime;
import fitnlu.ntpos.userservice.domain.model.TimeSearch;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.userservice.infrastructure.paging.IPaging;
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

    public List<User> filterUserByTime(TimeSearch timeSearch) {
        try{
            //not closed keycloak instance because keycloak will auto close after .. minutes (config)
            Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            List<UserRepresentation> userRepresentation = usersResource.list();
            assert userRepresentation != null;
            return userRepresentation.stream().filter(userSearch -> DateTime.checkTimeSearch(timeSearch,userSearch.getCreatedTimestamp())).map(user -> {
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
    public List<User> filterUser(IPaging paging, String groupID, String searchType, String searchValue, String sortType, String sortValue) {
        if(paging!=null && paging.getPage()!=null && paging.getOffset()!=null){
           List<User> userList = filterUser(groupID,searchType,searchValue,sortType,sortValue);
           return userList.stream().skip(paging.getOffset()).limit(paging.getPage()).toList();
        }
        return filterUser(groupID,searchType,searchValue,sortType,sortValue);
    }

    @Override
    public List<User> filterUser(String groupID, String searchType, String searchValue, String sortType, String sortValue) {
        try{
            //not closed keycloak instance because keycloak will auto close after .. minutes (config)
            Keycloak keycloak = keycloakUtils.getKeycloakInstance() ;
            ClientRepresentation clientRepresentation = keycloak.realm(KEYCLOAK_REALM).clients().findByClientId(KEYCLOAK_CLIENT_ID).get(0);
            UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
            List<UserRepresentation> userRepresentation = usersResource.list();
            assert userRepresentation != null;
            if(groupID!=null && !groupID.isEmpty()){
                GroupsResource groupsResource = keycloak.realm(KEYCLOAK_REALM).groups();
                userRepresentation = groupsResource.group(groupID).members();
            }
            if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
                userRepresentation = userRepresentation.stream().filter(user -> {
                    return switch (searchType) {
                        case "username" -> user.getUsername().contains(searchValue);
                        case "email" -> user.getEmail().contains(searchValue);
                        case "firstName" -> user.getFirstName().contains(searchValue);
                        case "lastName" -> user.getLastName().contains(searchValue);
                        case "phoneNumber" -> user.getAttributes().get("phoneNumber").contains(searchValue);
                        default -> false;
                    };
                }).toList();
            }
            if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
                userRepresentation = userRepresentation.stream().sorted((user1,user2) -> {
                    return switch (sortType) {
                        case "username" -> sortValue.equalsIgnoreCase("asc") ? user1.getUsername().compareTo(user2.getUsername()) : user2.getUsername().compareTo(user1.getUsername());
                        case "email" -> sortValue.equalsIgnoreCase("asc") ? user1.getEmail().compareTo(user2.getEmail()) : user2.getEmail().compareTo(user1.getEmail());
                        case "firstName" -> sortValue.equalsIgnoreCase("asc") ? user1.getFirstName().compareTo(user2.getFirstName()) : user2.getFirstName().compareTo(user1.getFirstName());
                        case "lastName" -> sortValue.equalsIgnoreCase("asc") ? user1.getLastName().compareTo(user2.getLastName()) : user2.getLastName().compareTo(user1.getLastName());
                        default -> 0;
                    };
                }).toList();
            }

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
}
