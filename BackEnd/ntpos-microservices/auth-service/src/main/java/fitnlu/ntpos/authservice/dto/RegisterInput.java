package fitnlu.ntpos.authservice.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RegisterInput implements Serializable {
    private String name;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String address;
    private String avatar;

}
