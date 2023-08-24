package fitnlu.ntpos.paymentservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
//phieu chi
public class PaySlip {
    private String id;
    private String materialReturnID;
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
