package fitnlu.ntpos.orderservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderLineItemOutput {
    private String orderID;
    private String productID;
    private int quantity;
    private double price;
    private double discount;
}
