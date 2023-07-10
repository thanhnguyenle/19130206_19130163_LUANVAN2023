package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ListMaterialOutput {
    private String id;
    private String name;
    private double price;
    private String unit;
    private int quantity;
    private String status;
    private String description;
    private long expiredDate ;
    private long manufacturerDate;
}
