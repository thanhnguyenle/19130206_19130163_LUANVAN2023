package fitnlu.ntpos.orderservice.adapter.input.dto;
import java.util.List;

public record OrderReturnInput(
         String userID,
         String group,
         String orderID,
         long orderReturnDate,
         List<OrderLineItemInput> orderLineItemsReturn,
         String status,
         String note,
         List<OrderTableInput> tablesReturn
) {
}
