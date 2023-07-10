package fitnlu.ntpos.productservice.infrastructure.jwt.gsonDTO;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResourceAccessDTO {
    private AccountDTO account;
    @SerializedName("user-test")
    private AccountDTO user_test;
}
