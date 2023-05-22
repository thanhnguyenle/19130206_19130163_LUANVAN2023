package fitnlu.ntpos.authservice.adapter.output.keycloak.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleKeycloak {
    private String roleName;
    private String description;
    private List<String> compositeRoles;
}
