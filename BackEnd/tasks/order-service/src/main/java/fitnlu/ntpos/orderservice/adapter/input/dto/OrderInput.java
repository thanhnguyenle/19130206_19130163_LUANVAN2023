package fitnlu.ntpos.orderservice.adapter.input.dto;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public record OrderInput(
         String userID,
         String group,
         long orderDate,
         List<OrderLineItemInput> orderLineItems,
         String status,
         String note,
         List<TableInput> tables
) {
}
