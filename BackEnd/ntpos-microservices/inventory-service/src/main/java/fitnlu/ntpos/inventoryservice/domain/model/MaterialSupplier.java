package fitnlu.ntpos.inventoryservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class MaterialSupplier {
    private String materialID;
    private String supplierID;
    private String supplyDate;
    private String status;
    private String description;
}
