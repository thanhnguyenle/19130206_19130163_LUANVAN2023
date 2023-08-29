package fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaterialImageEntities {
    private String id;
    private String url;
    private String description;
    private String materialID;
}
