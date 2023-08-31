package fitnlu.ntpos.inventoryservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class MaterialSetupDefault {
    private String materialId;
    private String unit;
    private int quantity;
    private String status;
    private String description;
    private long timestamp ;
}
