package fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.PaySlipInventoryEntities;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptInventoryEntities;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public class PaySlipInventoryMapperOutput {
    public static PaySlipInventoryEntities toEntities(PaySlip paySlip) {
        return PaySlipInventoryEntities.builder()
                .id(paySlip.getId())
                .materialReturnID(paySlip.getMaterialReturnID())
                .total(paySlip.getTotal())
                .totalReceive(paySlip.getTotalReceive())
                .totalReturn(paySlip.getTotalReturn())
                .status(paySlip.getStatus())
                .description(paySlip.getDescription())
                .paymentType(paySlip.getPaymentType())
                .accountSend(paySlip.getAccountSend())
                .accountReceive(paySlip.getAccountReceive())
                .createdAt(paySlip.getCreatedAt())
                .build();
    }
    public static PaySlip toDomain(PaySlipInventoryEntities paySlipInventoryEntities){
        return PaySlip.builder()
                .id(paySlipInventoryEntities.getId())
                .materialReturnID(paySlipInventoryEntities.getMaterialReturnID())
                .total(paySlipInventoryEntities.getTotal())
                .totalReceive(paySlipInventoryEntities.getTotalReceive())
                .totalReturn(paySlipInventoryEntities.getTotalReturn())
                .status(paySlipInventoryEntities.getStatus())
                .description(paySlipInventoryEntities.getDescription())
                .paymentType(paySlipInventoryEntities.getPaymentType())
                .accountSend(paySlipInventoryEntities.getAccountSend())
                .accountReceive(paySlipInventoryEntities.getAccountReceive())
                .createdAt(paySlipInventoryEntities.getCreatedAt())
                .build();
    }
}
