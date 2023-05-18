package fitnlu.ntpos.userservice.infrastructure.jwt.dto;

import fitnlu.ntpos.userservice.domain.model.Group;
import fitnlu.ntpos.userservice.domain.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserJwtDTO {
    private String id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String address;
    private String avatar;
    private List<String> roles;
    private List<String> groups;
    private long registeredAt;
}
