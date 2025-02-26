package fitnlu.ntpos.inventoryservice.domain.model;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MaterialSetupDefault {
    private String id;
    private String name;
    private String materialId;
    private String unit;
    private int quantity;
    private String status;
    private String description;
}
