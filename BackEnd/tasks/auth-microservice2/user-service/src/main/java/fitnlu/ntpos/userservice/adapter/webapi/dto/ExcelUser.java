package fitnlu.ntpos.userservice.adapter.webapi.dto;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class ExcelUser {
    private String id;
    private String name;
    private String username;
    private String email;
    private String phoneNumber;
    private String address;
    private String avatar;
    private long registeredAt;
}
