package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderTableEntities {
    private String orderID;
    private String tableID;
    private String status;
    private String note;
    private long startTime;
    private long endTime;
}
