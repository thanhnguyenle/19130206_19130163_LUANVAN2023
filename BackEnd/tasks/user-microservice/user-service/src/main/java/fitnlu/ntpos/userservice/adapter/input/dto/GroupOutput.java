package fitnlu.ntpos.userservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class GroupOutput {
    private String id;
    private String name;
    private String description;
    @Setter
    private List<UserOutput> users;
    @Setter
    private List<RoleOutput> roles;
}
