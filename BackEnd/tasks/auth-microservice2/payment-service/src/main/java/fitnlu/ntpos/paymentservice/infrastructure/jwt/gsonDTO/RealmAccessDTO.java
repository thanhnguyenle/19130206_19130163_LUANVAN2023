package fitnlu.ntpos.paymentservice.infrastructure.jwt.gsonDTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
public class RealmAccessDTO {
    private List<String> roles;
    private List<String> groups;
}
