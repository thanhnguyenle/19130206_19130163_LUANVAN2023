package fitnlu.ntpos.productservice.adapter.input.dto;

import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class ProductOutput {
    private String id;
    private String name;
    private String description;
    @Setter
    private List<ProductImageOutput> images;
    @Setter
    private List<CategoryOutput> categories;
    private Double price;
    private int quantity;
    private String unit;
    private String status;
    private long createdAt;
}
