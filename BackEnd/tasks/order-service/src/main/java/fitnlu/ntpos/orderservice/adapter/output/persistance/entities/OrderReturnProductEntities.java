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
    private String id;
    private String productID;
    private String productName;
    private String productPrice;
    private String quantity;
    private String discount;
    private String total;
}
