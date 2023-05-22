package fitnlu.ntpos.authservice.adapter.output.keycloak.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserKeycloak {
    private String userName;
    private String email;
    private String phoneNumber;
    private String password;
    private String firstname;
    private String lastName;
}
