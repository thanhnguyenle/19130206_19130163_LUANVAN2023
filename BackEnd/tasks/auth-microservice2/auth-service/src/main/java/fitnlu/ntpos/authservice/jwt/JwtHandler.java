package fitnlu.ntpos.authservice.config;

import fitnlu.ntpos.authservice.model.User;
import org.apache.commons.codec.binary.Base64;

public class JwtHandler {
    private String jwt;
    public JwtHandler(String jwt){
        this.jwt = jwt;
    }
    public String getJwt(){
        return this.jwt;
    }
    public void setJwt(String jwt){
        this.jwt = jwt;
    }
    public User getUser(){
        System.out.println(httpServletRequest.getHeader("Authorization"));
        String jwtToken = httpServletRequest.getHeader("Authorization").substring(7);
        System.out.println("------------ Decode JWT ------------");
        String[] split_string = jwtToken.split("\\.");
        String base64EncodedHeader = split_string[0];
        String base64EncodedBody = split_string[1];
        String base64EncodedSignature = split_string[2];

        System.out.println("~~~~~~~~~ JWT Header ~~~~~~~");
        Base64 base64Url = new Base64(true);
        String header = new String(base64Url.decode(base64EncodedHeader));
        System.out.println("JWT Header : " + header);


        System.out.println("~~~~~~~~~ JWT Body ~~~~~~~");
        String body = new String(base64Url.decode(base64EncodedBody));
        System.out.println("JWT Body : "+body);
        return new User("admin", "admin");
    }
}
