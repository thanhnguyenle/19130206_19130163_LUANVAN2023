package fitnlu.ntpos.notificationservice.jwt;

import com.google.gson.Gson;
import fitnlu.ntpos.notificationservice.jwt.dto.UserJwtDTO;
import fitnlu.ntpos.notificationservice.jwt.gsonDTO.JWTPayLoadDTO;
import lombok.Data;
import org.apache.commons.codec.binary.Base64;


@Data
public class JwtHandler {
    private String jwt;
    private static JwtHandler instance;

    private JwtHandler() {
    }
    public static JwtHandler getInstance(){
        if(instance == null){
            instance = new JwtHandler();
        }
        return instance;
    }

    public UserJwtDTO getUser(){
        if(jwt == null){
            return null;
        }
        String jwtToken = jwt.substring(7);
        String[] split_string = jwtToken.split("\\.");
        String base64EncodedHeader = split_string[0];
        String base64EncodedBody = split_string[1];
        String base64EncodedSignature = split_string[2];

        Gson gson = new Gson();
        Base64 base64Url = new Base64(true);
        //body
        String body = new String(base64Url.decode(base64EncodedBody));
        JWTPayLoadDTO jwtObjectDTO = gson.fromJson( body, JWTPayLoadDTO.class);
        if(jwtObjectDTO.getResource_access()==null){
            return null;
        }else if(jwtObjectDTO.getResource_access().getUser_test()==null) {
            return null;
        }
        return UserJwtDTO.builder()
                .name(jwtObjectDTO.getName())
                .id(jwtObjectDTO.getSub())
                .email(jwtObjectDTO.getEmail())
                .username(jwtObjectDTO.getPreferred_username())
                .roles(jwtObjectDTO.getResource_access().getUser_test().getRoles())
                .groups(jwtObjectDTO.getGroups())
                .phoneNumber(jwtObjectDTO.getPhoneNumber())
                .address(jwtObjectDTO.getAddress())
                .avatar(jwtObjectDTO.getAvatar())
                .build();

    }
}
