package fitnlu.ntpos.paymentservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class PaySlipInventoryOutput {
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
