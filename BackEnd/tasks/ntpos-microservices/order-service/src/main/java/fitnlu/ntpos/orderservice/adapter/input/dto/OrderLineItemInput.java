package fitnlu.ntpos.orderservice.adapter.input.dto;

public record OrderLineItemInput(
         String productID,
         int quantity,
         double price,
         double discount,
         String name
) {

}
