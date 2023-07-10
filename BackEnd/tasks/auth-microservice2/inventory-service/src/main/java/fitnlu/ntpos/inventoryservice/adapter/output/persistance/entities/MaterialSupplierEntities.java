package fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaterialSupplierEntities {
    private String materialID;
    private String supplierID;
    private String supplyDate;
    private String status;
    private String description;
}
