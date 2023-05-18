package fitnlu.ntpos.productservice.adapter.output.persistance.entities;

import fitnlu.ntpos.productservice.domain.model.Category;
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
public class CategoryEntities {
    private String id;
    private String name;
    private String description;
    private List<ProductImage> images;
    private List<Category> categories;
    private Double price;
    private String unit;
    private String status;
}
