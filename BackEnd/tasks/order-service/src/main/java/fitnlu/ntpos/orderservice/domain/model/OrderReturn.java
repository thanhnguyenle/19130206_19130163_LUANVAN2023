package fitnlu.ntpos.orderservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class OrderReturn {
    private String id;
    private String userID;
    private int numberOfPeople;
    private String group;
    private String orderDate;
    private List<OrderLineItem> orderLineItems;
    private String status;
    private String note;
    private List<Table> table;
}
