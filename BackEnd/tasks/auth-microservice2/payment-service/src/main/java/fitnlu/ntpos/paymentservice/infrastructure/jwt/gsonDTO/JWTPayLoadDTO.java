package fitnlu.ntpos.paymentservice.infrastructure.jwt.gsonDTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
public class JWTPayLoadDTO {
    private long exp;
    private long iat;
    private String jti;
    private String sub;
    private String typ;
    private ResourceAccessDTO resource_access;
    private String scope;
    private String sid;
    private boolean email_verified;
    private String name;
    private List<String> groups;
    private String preferred_username;
    private String given_name;
    private String email;
    private String avatar;
    private String phoneNumber;
    private String address;

}
