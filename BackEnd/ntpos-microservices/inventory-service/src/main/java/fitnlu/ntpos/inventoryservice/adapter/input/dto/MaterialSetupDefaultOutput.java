package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class MaterialSetupDefaultOutput {
    private String id;
    private String name;
    private String materialId;
    private String unit;
    private int quantity;
    private String status;
    private String description;
}
