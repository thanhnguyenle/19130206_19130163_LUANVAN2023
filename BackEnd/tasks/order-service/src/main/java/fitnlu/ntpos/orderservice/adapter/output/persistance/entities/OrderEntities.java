package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntities {
    private String id;
    private String userID;
    private int numberOfPeople;
    private String group;
    private String orderDate;
    private List<OrderLineItemEntities> orderLineItems;
    private String status;
    private String note;
    private List<TableEntities> table;
}
