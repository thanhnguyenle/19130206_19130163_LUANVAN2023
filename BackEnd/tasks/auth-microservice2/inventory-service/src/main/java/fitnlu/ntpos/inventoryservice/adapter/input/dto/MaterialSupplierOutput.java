package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MaterialSupplierOutput {
    private String materialID;
    private String supplierID;
    private String supplyDate;
    private String status;
    private String description;
}
