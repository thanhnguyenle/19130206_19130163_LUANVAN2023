package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderReturnTableEntities {
    private String orderReturnID;
    private String tableReturnID;
    private String note;
    private long startTime;
    private long endTime;
}
