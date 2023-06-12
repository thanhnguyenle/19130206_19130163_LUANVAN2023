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
public class Order {
    private String id;
    private String userID;
    private int numberOfPeople;
    private String group;
    private long orderDate;
    private List<OrderProduct> orderLineItems;
    private String status;
    private String note;
    private List<Table> table;
}
