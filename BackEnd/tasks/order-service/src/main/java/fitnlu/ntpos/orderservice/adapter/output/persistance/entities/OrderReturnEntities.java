package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderReturnEntities {
    private String id;
    private String userID;
    private String group;
    private String orderID;
    private long orderReturnDate;
    private List<OrderProductEntities> orderLineItemsReturn;
    private List<OrderTableEntities> tableReturn;
    private String status;
    private String note;

}
