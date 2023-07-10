package fitnlu.ntpos.userservice.infrastructure.jwt.gsonDTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RoleDTO {
    private List<String> roles;
}
