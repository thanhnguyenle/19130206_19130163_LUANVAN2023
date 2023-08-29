package fitnlu.ntpos.productservice.adapter.output.persistance.entities;

import fitnlu.ntpos.productservice.domain.model.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageEntities {
    private int id;
    private String url;
    private String description;
}
