package fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptInventoryEntities;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public class ReceiptInventoryMapperOutput {
    public static ReceiptInventoryEntities toEntities(Receipt receipt) {
        return ReceiptInventoryEntities.builder()
                .id(receipt.getId())
                .materialID(receipt.getMaterialReturnID())
                .total(receipt.getTotal())
                .totalReceive(receipt.getTotalReceive())
                .totalReturn(receipt.getTotalReturn())
                .status(receipt.getStatus())
                .description(receipt.getDescription())
                .paymentType(receipt.getPaymentType())
                .accountSend(receipt.getAccountSend())
                .accountReceive(receipt.getAccountReceive())
                .createdAt(receipt.getCreatedAt())
                .build();
    }
    public static Receipt toDomain(ReceiptInventoryEntities receiptInventoryEntities){
        return Receipt.builder()
                .id(receiptInventoryEntities.getId())
                .materialReturnID(receiptInventoryEntities.getMaterialID())
                .total(receiptInventoryEntities.getTotal())
                .totalReceive(receiptInventoryEntities.getTotalReceive())
                .totalReturn(receiptInventoryEntities.getTotalReturn())
                .status(receiptInventoryEntities.getStatus())
                .description(receiptInventoryEntities.getDescription())
                .paymentType(receiptInventoryEntities.getPaymentType())
                .accountSend(receiptInventoryEntities.getAccountSend())
                .accountReceive(receiptInventoryEntities.getAccountReceive())
                .createdAt(receiptInventoryEntities.getCreatedAt())
                .build();
    }
}
