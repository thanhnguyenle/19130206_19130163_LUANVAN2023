package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class MaterialOutput{
    private String id;
    private String name;
    private double price;
    private String unit;
    @Setter
    private int quantity;
    private String status;
    private String description;
    private long expiredDate ;
    private long manufacturerDate;
    @Setter
    private List<MaterialImageOutput> materialImageOutputs;
    @Setter
    private List<MaterialProductOutput> materialProductOutputs;
    @Setter
    private List<MaterialSupplierOutput> materialSupplierOutputs;
}
