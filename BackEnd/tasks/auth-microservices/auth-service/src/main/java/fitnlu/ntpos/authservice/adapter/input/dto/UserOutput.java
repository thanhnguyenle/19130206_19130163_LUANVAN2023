package fitnlu.ntpos.authservice.adapter.input.dto;

import fitnlu.ntpos.authservice.domain.model.DateTime;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;
@Getter
@Builder
public class UserDTO {
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
