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
public class Category {
    private String id;
    private String name;
    private String description;
    private List<Product> products;
    private long createdAt;
}
