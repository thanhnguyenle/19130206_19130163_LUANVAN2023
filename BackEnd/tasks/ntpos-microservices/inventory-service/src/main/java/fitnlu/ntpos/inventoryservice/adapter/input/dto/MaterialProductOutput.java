package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MaterialProductOutput{
    private String productID;
    private String materialID;
    private String unit;
    private int quantity;
    private String status;
    private String description;
}
