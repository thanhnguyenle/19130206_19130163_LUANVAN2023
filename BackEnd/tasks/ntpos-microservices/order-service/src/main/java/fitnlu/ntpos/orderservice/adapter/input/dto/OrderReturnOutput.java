package fitnlu.ntpos.orderservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class OrderReturnOutput {
    private String id;
    private String userID;
    private String group;
    private String orderID;
    private long orderReturnDate;
    @Setter
    private List<OrderLineItemOutput> orderLineItemsReturn;
    @Setter
    private List<OrderTableOutput> tablesReturn;
    private String status;
    private String note;
}
