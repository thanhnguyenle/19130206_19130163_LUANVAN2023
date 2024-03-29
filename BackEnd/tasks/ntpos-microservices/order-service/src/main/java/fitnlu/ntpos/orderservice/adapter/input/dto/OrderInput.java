package fitnlu.ntpos.orderservice.adapter.input.dto;
import java.util.List;

public record OrderInput(
         String userID,
         String group,
         long orderDate,
         List<OrderLineItemInput> orderLineItems,
         String status,
         String note,
         List<OrderTableInput> tables
) {
}
