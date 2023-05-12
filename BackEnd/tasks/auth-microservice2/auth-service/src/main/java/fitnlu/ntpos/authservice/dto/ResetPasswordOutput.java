package fitnlu.ntpos.authservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordOutput {
    String id;
    String email;
    String oldPassword;
    String password;
}
