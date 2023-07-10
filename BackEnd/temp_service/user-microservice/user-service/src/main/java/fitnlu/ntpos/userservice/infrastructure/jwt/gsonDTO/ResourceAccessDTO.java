package fitnlu.ntpos.userservice.infrastructure.jwt.gsonDTO;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResourceAccessDTO {
    @SerializedName("user-test")
    private RoleDTO user_test;
}
