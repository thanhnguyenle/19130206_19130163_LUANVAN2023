package fitnlu.ntpos.orderservice.infracstructure.jwt.gsonDTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AccountDTO {
    private List<String> roles;
}
