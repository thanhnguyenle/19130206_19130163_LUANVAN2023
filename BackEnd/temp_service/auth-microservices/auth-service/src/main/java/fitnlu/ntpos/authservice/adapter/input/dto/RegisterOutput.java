package fitnlu.ntpos.authservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class RegisterOutput {
    private String id;
    private List<String> roles;
    private long registeredAt;
}
