package fitnlu.ntpos.userservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class Group {
    private String id;
    private String name;
    private String description;
    private List<User> users;
    private List<Role> roles;
}
