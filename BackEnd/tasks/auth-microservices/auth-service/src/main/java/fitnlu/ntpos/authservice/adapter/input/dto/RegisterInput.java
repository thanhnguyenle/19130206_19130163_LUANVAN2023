package fitnlu.ntpos.authservice.adapter.input.dto;

public record RegisterInput(
        String username,
        String name,
        String password,
        String email,
        String phoneNumber,
        String address,
        String avatar
) {
}
