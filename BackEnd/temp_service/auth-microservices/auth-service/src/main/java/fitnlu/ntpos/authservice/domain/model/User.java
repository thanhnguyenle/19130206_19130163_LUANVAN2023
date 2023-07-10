package fitnlu.ntpos.authservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
public class User {
    private String id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String address;
    private String avatar;
    private List<String> roles;
    private long registeredAt;
}
