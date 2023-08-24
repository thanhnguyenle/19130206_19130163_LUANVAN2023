package fitnlu.ntpos.productservice.adapter.webapi.dto;

import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ExcelProduct {
    private String id;
    private String name;
    private String description;
    private int quantity;
    private Double price;
    private String unit;
    private String status;
    private long createdAt;
}
