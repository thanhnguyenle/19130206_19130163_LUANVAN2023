package fitnlu.ntpos.paymentservice.adapter.input.dto;

import java.util.List;

public record PaySlipOrderInput(
        String orderReturnID,
        double total,
        double totalReceive,
        double totalReturn,
        String status,
        String description,
        String paymentType,
        String accountSend,
        String accountReceive,
        long createdAt

) {
}
