package fitnlu.ntpos.userservice.adapter.input.dto;

import java.util.List;

public record UserInput(
        String username,
        String name,
        String email,
        String password,
        String phoneNumber,
        String address,
        String avatar,
        List<String> roles,
        List<String> groups){
}
