package fitnlu.ntpos.userservice.adapter.output.keycloak.entities;

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
    private String avatar;
    private String address;
    private String password;
    private String firstname;
    private String lastName;
}
