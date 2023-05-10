package fitnlu.ntpos.userservice.adapter.input.dto;

import java.util.List;

public record GroupInput(
     String roleName,
     String description,
     List<String> compositeRoles
){}
