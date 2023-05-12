package fitnlu.ntpos.userservice.adapter.output.keycloak.mapper;

import fitnlu.ntpos.userservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.userservice.adapter.output.keycloak.entities.RoleKeycloak;
import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.Role;
import fitnlu.ntpos.userservice.infrastructure.annotations.Mapper;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;

import java.util.List;

@Mapper
public class GroupMapperOutput {

    public Group toDomain(GroupRepresentation groupRepresentation){
        if(groupRepresentation == null) return null;
        String description = "";
        if(groupRepresentation.getAttributes()!=null) {
            List<String> list = groupRepresentation.getAttributes().get("description");
            description = list == null ? "" : list.get(0);
        }
        return Group.builder()
                .name(groupRepresentation.getName())
                .id(groupRepresentation.getId())
                .description(description)
                .build();
    }

    public GroupRepresentation toRepresentation(Group group) {
        GroupRepresentation groupRepresentation = new GroupRepresentation();
        groupRepresentation.setName(group.getName());
        groupRepresentation.setId(group.getId());
        groupRepresentation.singleAttribute("description", group.getDescription());
        return groupRepresentation;
    }
}
