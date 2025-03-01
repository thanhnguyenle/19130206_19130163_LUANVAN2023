package fitnlu.ntpos.orderservice.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderTable {
    private String orderID;
    private String tableID;
    private String name;
    private String status;
    private String note;
    private long startTime;
    private long endTime;

}
