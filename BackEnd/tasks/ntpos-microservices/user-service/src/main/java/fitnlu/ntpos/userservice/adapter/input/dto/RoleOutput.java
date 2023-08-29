package fitnlu.ntpos.userservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Getter
@Builder
public class RoleOutput {
    private String roleName;
    private String description;
    private List<String> compositeRoles;
}
