package fitnlu.ntpos.paymentservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaySlipOrderEntities {
    private String id;
    private String orderReturnID;
    private double total;
    private double totalReceive;
    private double totalReturn;
    private String status;
    private String description;
    private String paymentType;
    private String accountSend;
    private String accountReceive;
    private long createdAt;
}
