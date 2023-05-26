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
    private String name;
    private int numberOfPeople;
    private String status;
    private String note;
    private String startTime;
    private String endTime;
}
