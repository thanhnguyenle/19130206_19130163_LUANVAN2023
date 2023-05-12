package fitnlu.ntpos.authservice.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LoginInput implements Serializable {
    private String email;
    private String password;
}
