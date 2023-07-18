package fitnlu.ntpos.paymentservice.adapter.input.dto;

public record ReceiptInventoryInput(
         String id,
         String materialReturnID,
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
