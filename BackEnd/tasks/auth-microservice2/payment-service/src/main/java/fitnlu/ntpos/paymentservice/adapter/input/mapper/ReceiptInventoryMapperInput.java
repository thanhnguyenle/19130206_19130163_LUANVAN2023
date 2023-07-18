package fitnlu.ntpos.paymentservice.adapter.input.mapper;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptInventoryOutput;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public class ReceiptInventoryMapperInput {
    public static ReceiptInventoryOutput toDTO(Receipt receipt) {
        return ReceiptInventoryOutput.builder()
                .id(receipt.getId())
                .materialID(receipt.getMaterialReturnID())
                .total(receipt.getTotal())
                .totalReturn(receipt.getTotalReturn())
                .totalReceive(receipt.getTotalReceive())
                .status(receipt.getStatus())
                .accountReceive(receipt.getAccountReceive())
                .accountSend(receipt.getAccountSend())
                .paymentType(receipt.getPaymentType())
                .description(receipt.getDescription())
                .createdAt(receipt.getCreatedAt())
                .build();
    }

    public static Receipt toDomain(ReceiptInventoryInput paySlipInventoryInput) {
        return Receipt.builder()
                .materialReturnID(paySlipInventoryInput.materialID())
                .total(paySlipInventoryInput.total())
                .totalReturn(paySlipInventoryInput.totalReturn())
                .totalReceive(paySlipInventoryInput.totalReceive())
                .status(paySlipInventoryInput.status())
                .accountReceive(paySlipInventoryInput.accountReceive())
                .accountSend(paySlipInventoryInput.accountSend())
                .paymentType(paySlipInventoryInput.paymentType())
                .description(paySlipInventoryInput.description())
                .createdAt(paySlipInventoryInput.createdAt())
                .build();
    }
}
