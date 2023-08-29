package fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupplierEntities {
    private String id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String website;
    private String status;
    private String description;
}
