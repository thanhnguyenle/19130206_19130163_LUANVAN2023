package fitnlu.ntpos.userservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class UserOutput {
    private String id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String address;
    private String avatar;
    @Setter
    private List<GroupOutput> groups;
    @Setter
    private List<RoleOutput> roles;
    private long registeredAt;
}
