package fitnlu.ntpos.productservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class ProductImage {
    private int id;
    private String url;
    private String description;

}
