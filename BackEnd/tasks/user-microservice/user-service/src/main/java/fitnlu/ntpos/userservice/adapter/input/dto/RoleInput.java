package fitnlu.ntpos.authservice.adapter.input.dto;

import java.util.List;

public record RoleInput (
     String roleName,
     String description,
     List<String> compositeRoles
){}
