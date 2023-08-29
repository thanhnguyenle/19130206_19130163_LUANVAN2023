package fitnlu.ntpos.productservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductImageInput {
    private int id;
    private String url;
    private String description;
}
