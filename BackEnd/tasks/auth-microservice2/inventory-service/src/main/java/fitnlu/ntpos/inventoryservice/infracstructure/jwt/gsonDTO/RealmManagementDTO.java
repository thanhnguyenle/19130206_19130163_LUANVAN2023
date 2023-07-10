package fitnlu.ntpos.inventoryservice.infracstructure.jwt.gsonDTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
public class RealmManagementDTO {
    List<String> roles;
}
