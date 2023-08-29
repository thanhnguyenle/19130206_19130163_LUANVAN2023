package fitnlu.ntpos.authservice.jwt;

import com.google.gson.Gson;
import fitnlu.ntpos.authservice.jwt.gsonDTO.JWTHeaderDTO;
import fitnlu.ntpos.authservice.jwt.gsonDTO.JWTPayLoadDTO;
import fitnlu.ntpos.authservice.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class JwtHandler {
    private String jwt;

    public User getUser(){
        String jwtToken = jwt.substring(7);
        String[] split_string = jwtToken.split("\\.");
        String base64EncodedHeader = split_string[0];
        String base64EncodedBody = split_string[1];
        String base64EncodedSignature = split_string[2];

        Gson gson = new Gson();
        Base64 base64Url = new Base64(true);
        //header
        String header = new String(base64Url.decode(base64EncodedHeader));
        JWTHeaderDTO jwtHeaderDTO = gson.fromJson(header, JWTHeaderDTO.class);
        //body
        String body = new String(base64Url.decode(base64EncodedBody));
        JWTPayLoadDTO jwtObjectDTO = gson.fromJson( body, JWTPayLoadDTO.class);

        return User.builder()
                .name(jwtObjectDTO.getName())
                .id(jwtObjectDTO.getSub())
                .email(jwtObjectDTO.getEmail())
                .username(jwtObjectDTO.getPreferred_username())
                .roles(jwtObjectDTO.getResource_access().getAccount().getRoles())
                .groups(jwtObjectDTO.getGroups())
                .phoneNumber(jwtObjectDTO.getPhoneNumber())
                .address(jwtObjectDTO.getAddress())
                .avatar(jwtObjectDTO.getAvatar())
                .build();

    }
}
