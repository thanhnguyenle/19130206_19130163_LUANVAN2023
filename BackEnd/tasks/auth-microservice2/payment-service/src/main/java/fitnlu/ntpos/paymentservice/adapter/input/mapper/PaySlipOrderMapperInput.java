package fitnlu.ntpos.paymentservice.adapter.input.mapper;

import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipOrderInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipOrderOutput;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public class PaySlipOrderMapperInput {
    public static PaySlipOrderOutput toDTO(PaySlip paySlip) {
        return PaySlipOrderOutput.builder()
                .id(paySlip.getId())
                .orderReturnID(paySlip.getMaterialReturnID())
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

    public static PaySlip toDomain(PaySlipOrderInput paySlipInventoryInput) {
        return PaySlip.builder()
                .materialReturnID(paySlipInventoryInput.orderReturnID())
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
