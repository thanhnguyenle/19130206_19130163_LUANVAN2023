package fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptOrderEntities;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public class ReceiptOrderMapperOutput {
    public static ReceiptOrderEntities toEntities(Receipt receipt) {
        return ReceiptOrderEntities.builder()
                .id(receipt.getId())
                .orderReturnID(receipt.getMaterialReturnID())
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
    public static Receipt toDomain(ReceiptOrderEntities receiptOrderEntities){
        return Receipt.builder()
                .id(receiptOrderEntities.getId())
                .materialReturnID(receiptOrderEntities.getOrderReturnID())
                .total(receiptOrderEntities.getTotal())
                .totalReceive(receiptOrderEntities.getTotalReceive())
                .totalReturn(receiptOrderEntities.getTotalReturn())
                .status(receiptOrderEntities.getStatus())
                .description(receiptOrderEntities.getDescription())
                .paymentType(receiptOrderEntities.getPaymentType())
                .accountSend(receiptOrderEntities.getAccountSend())
                .accountReceive(receiptOrderEntities.getAccountReceive())
                .createdAt(receiptOrderEntities.getCreatedAt())
                .build();
    }
}
