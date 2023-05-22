package fitnlu.ntpos.userservice.adapter.input.dto;

import java.util.List;

public record GroupInput(
     String name,
     String description,
     List<String> users,
     List<String> roles
){}
