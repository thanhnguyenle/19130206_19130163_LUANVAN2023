package fitnlu.ntpos.authservice.controller;

import fitnlu.ntpos.authservice.dto.LoginInput;
import fitnlu.ntpos.authservice.dto.RefreshTokenInput;
import fitnlu.ntpos.authservice.dto.RegisterInput;
import fitnlu.ntpos.authservice.dto.ResetPasswordInput;
import fitnlu.ntpos.authservice.jwt.JwtHandler;
import fitnlu.ntpos.authservice.model.User;
import fitnlu.ntpos.authservice.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.apache.commons.codec.binary.Base64;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth-service")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtHandler jwtHandler;

    @PostMapping(
            path = "/login",
            consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> login(@RequestBody @Valid LoginInput loginInput) {
      try {
          return ResponseEntity.ok(authService.login(loginInput));
      }catch (Exception e){
          return ResponseEntity.status(401).body(e.getMessage());
      }
    }
    @PostMapping(
            path = "/register",
            consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> register(@RequestBody @Valid RegisterInput registerInput) {
        try {
            return ResponseEntity.ok(authService.register(registerInput));
        }catch (Exception e){
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }
    @PostMapping(
            path = "/resetPassword",
            consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordInput resetPasswordInput) {
        try {
            return ResponseEntity.ok(authService.sendResetPassword(resetPasswordInput));
        }catch (Exception e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
    @GetMapping(
            value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> me(HttpServletRequest httpServletRequest) {
        try {
            String jwtToken = httpServletRequest.getHeader("Authorization");
            jwtHandler.setJwt(jwtToken);
            User user = jwtHandler.getUser();
           return ResponseEntity.ok(user);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
    @PostMapping(
            path = "/verifyEmail",
            consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> verifyEmail(@RequestBody @Valid ResetPasswordInput resetPasswordInput) {
        try {
            return ResponseEntity.ok(authService.sendActiveEmail(resetPasswordInput));
        }catch (Exception e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping(
            path = "/refreshToken",
            consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> refreshToken(@RequestBody @Valid RefreshTokenInput refreshTokenInput) {
        try {
            return ResponseEntity.ok(authService.refreshToken(refreshTokenInput));
        }catch (Exception e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
