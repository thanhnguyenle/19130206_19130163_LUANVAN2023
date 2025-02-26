package fitnlu.ntpos.productservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@Builder
@ToString
public class Product {
    private String id;
    private String name;
    private String description;
    private List<ProductImage> images;
    private List<Category> categories;
    private int quantity;
    private Double price;
    private String unit;
    private String status;
    private long createdAt;

}
