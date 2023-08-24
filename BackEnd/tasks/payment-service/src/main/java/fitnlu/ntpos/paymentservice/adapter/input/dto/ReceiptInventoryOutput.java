package fitnlu.ntpos.paymentservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReceiptInventoryOutput {
    private String id;
    private String materialID;
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
