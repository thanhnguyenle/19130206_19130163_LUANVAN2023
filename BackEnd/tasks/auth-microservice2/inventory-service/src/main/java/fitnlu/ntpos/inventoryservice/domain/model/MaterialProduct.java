package fitnlu.ntpos.inventoryservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class MaterialProduct {
    private String productID;
    private String materialID;
    private String unit;
    private int quantity;
    private String status;
    private String description;
}
