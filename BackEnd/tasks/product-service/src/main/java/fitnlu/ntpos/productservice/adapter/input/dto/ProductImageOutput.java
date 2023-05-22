package fitnlu.ntpos.productservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductImageOutput {
    private int id;
    private String url;
    private String description;
}
