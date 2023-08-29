package fitnlu.ntpos.paymentservice.adapter.input.mapper;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderOutput;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public class ReceiptOrderMapperInput {
    public static ReceiptOrderOutput toDTO(Receipt paySlip) {
        return ReceiptOrderOutput.builder()
                .id(paySlip.getId())
                .orderID(paySlip.getMaterialReturnID())
                .total(paySlip.getTotal())
                .totalReturn(paySlip.getTotalReturn())
                .totalReceive(paySlip.getTotalReceive())
                .status(paySlip.getStatus())
                .accountReceive(paySlip.getAccountReceive())
                .accountSend(paySlip.getAccountSend())
                .paymentType(paySlip.getPaymentType())
                .description(paySlip.getDescription())
                .createdAt(paySlip.getCreatedAt())
                .build();
    }

    public static Receipt toDomain(ReceiptOrderInput paySlipInventoryInput) {
        return Receipt.builder()
                .materialReturnID(paySlipInventoryInput.orderID())
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
