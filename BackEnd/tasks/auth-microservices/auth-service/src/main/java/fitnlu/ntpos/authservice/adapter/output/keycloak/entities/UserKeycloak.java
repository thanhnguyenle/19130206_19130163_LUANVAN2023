package fitnlu.ntpos.authservice.adapter.output.keycloak.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    private String userName;
    private String email;
    private String phoneNumber;
    private String password;
    private String firstname;
    private String lastName;
}
