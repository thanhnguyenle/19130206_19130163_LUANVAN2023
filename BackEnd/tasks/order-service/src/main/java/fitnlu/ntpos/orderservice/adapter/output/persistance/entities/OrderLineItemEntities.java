package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderLineItemEntities {
    private String id;
    private String productID;
    private String productName;
    private String productPrice;
    private String quantity;
    private String discount;
    private String total;
}
