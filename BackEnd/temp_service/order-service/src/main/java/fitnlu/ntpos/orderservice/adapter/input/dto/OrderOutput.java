package fitnlu.ntpos.orderservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Builder
public class OrderOutput {
    private String id;
    private String userID;
    private String group;
    private long orderDate;
    @Setter
    private List<OrderLineItemOutput> orderLineItems;
    private String status;
    private String note;
    @Setter
    private List<OrderTableOutput> tables;
}
