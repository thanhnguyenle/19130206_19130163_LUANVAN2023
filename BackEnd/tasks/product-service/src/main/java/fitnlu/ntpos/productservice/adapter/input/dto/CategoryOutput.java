package fitnlu.ntpos.productservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class CategoryOutput {
    private String id;
    private String name;
    private String description;
    @Setter
    private List<ProductOutput> products;

}
