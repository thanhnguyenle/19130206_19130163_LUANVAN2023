package fitnlu.ntpos.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
@EnableWebFluxSecurity
@CrossOrigin(origins = "*")
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityWebFilterChain(ServerHttpSecurity http){
            http
                .csrf()
                .disable()
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/eureka/**","/actuator/**","/keycloak/**","/auth/resources/**","/zipkin/**",
                                "/auth-service/graphql","/product-service/graphql","/user-service/graphql",
                                "/auth-service/graphiql/**","/user-service/graphiql/**","/product-service/graphiql/**",
                        "/order-service/graphql","/order-service/graphiql/**","/kafka-ui/**","/inventory-service/graphql","/inventory-service/graphiql/**" ,
                                        "/payment-service/graphql","/payment-service/graphiql/**","/chat-service/**")
                        .permitAll()
                        .pathMatchers("/auth-service/login", "/auth-service/register", "/auth-service/resetPassword")
                        .permitAll()
                        .anyExchange()
                        .authenticated())
                .oauth2ResourceServer(ServerHttpSecurity.OAuth2ResourceServerSpec::jwt);
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager( admin);
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
