package fitnlu.ntpos.userservice.domain.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;
@Data
@Builder
public class Role {
    private String roleName;
    private String description;
    private List<String> compositeRoles;
}
