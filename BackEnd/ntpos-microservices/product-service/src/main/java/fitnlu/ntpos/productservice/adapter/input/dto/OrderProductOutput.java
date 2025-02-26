package fitnlu.ntpos.productservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class OrderProductOutput {
    private String id;
    private String name;
    private String description;
    private Double price;
    private int quantity;
    private String unit;
    private String status;
    private long createdAt;
    private double percent;
}
