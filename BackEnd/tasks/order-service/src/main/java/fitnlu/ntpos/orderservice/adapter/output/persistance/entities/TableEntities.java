package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;
import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TableEntities {
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
