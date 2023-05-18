package fitnlu.ntpos.productservice.adapter.input.dto;

import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ProductOutput {
    private String id;
    private String name;
    private String description;
    private Li images;
    private ListCategoryOutput categories;
    private Double price;
    private String unit;
    private String status;
}
