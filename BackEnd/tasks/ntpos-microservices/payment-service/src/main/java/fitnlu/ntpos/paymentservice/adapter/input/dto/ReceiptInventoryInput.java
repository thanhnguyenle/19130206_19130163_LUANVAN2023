package fitnlu.ntpos.paymentservice.adapter.input.dto;

public record ReceiptInventoryInput(
         String materialID,
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
