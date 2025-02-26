package fitnlu.ntpos.paymentservice.adapter.input.mapper;

import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public class PaySlipInventoryMapperInput {
    public static PaySlipInventoryOutput toDTO(PaySlip paySlip) {
        return PaySlipInventoryOutput.builder()
                .id(paySlip.getId())
                .materialReturnID(paySlip.getMaterialReturnID())
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

    public static PaySlip toDomain(PaySlipInventoryInput paySlipInventoryInput) {
        return PaySlip.builder()
                .materialReturnID(paySlipInventoryInput.materialReturnID())
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
