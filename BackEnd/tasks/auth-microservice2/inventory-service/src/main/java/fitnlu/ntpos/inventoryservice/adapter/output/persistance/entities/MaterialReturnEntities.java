package fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaterialReturnEntities {
    private String id;
    private String materialID;
    private double price;
    private String unit;
    private int quantity;
    private String status;
    private String description;
    private long returnDate;
}
