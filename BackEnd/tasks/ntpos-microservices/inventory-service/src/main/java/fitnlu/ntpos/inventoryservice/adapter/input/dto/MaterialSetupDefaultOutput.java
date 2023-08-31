package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MaterialSetupDefaultOutput {
    private String id;
    private String materialId;
    private String unit;
    private int quantity;
    private String status;
    private String description;
}
