package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderReturnProductEntities {
    private String orderReturnID;
    private String productID;
    private int quantity;
    private double price;
    private double discount;
    private String name;
}
