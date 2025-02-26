package fitnlu.ntpos.authservice.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

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
    private List<String> groups;
    private long registeredAt;
}