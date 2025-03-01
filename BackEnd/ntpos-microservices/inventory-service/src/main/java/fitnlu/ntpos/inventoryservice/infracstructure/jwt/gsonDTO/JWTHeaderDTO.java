package fitnlu.ntpos.inventoryservice.infracstructure.jwt.gsonDTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JWTHeaderDTO {
    private String alg;
    private String typ;
    private String kid;
}
