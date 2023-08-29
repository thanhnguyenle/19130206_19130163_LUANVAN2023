package fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaterialProductEntities {
    private String productID;
    private String materialID;
    private String unit;
    private int quantity;
    private String status;
    private String description;
}
