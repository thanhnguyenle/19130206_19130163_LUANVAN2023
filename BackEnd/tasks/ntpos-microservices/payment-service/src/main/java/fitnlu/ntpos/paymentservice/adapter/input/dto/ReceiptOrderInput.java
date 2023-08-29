package fitnlu.ntpos.paymentservice.adapter.input.dto;

public record ReceiptOrderInput(
        String orderID,
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
