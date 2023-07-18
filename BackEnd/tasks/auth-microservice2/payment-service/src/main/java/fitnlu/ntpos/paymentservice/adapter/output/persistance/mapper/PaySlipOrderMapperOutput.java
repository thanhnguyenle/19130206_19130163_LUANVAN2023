package fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.PaySlipInventoryEntities;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.PaySlipOrderEntities;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptInventoryEntities;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public class PaySlipOrderMapperOutput {
    public static PaySlipOrderEntities toEntities(PaySlip paySlip) {
        return PaySlipOrderEntities.builder()
                .id(paySlip.getId())
                .orderReturnID(paySlip.getMaterialReturnID())
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
    public static PaySlip toDomain(PaySlipOrderEntities paySlipOrderEntities){
        return PaySlip.builder()
                .id(paySlipOrderEntities.getId())
                .materialReturnID(paySlipOrderEntities.getOrderReturnID())
                .total(paySlipOrderEntities.getTotal())
                .totalReceive(paySlipOrderEntities.getTotalReceive())
                .totalReturn(paySlipOrderEntities.getTotalReturn())
                .status(paySlipOrderEntities.getStatus())
                .description(paySlipOrderEntities.getDescription())
                .paymentType(paySlipOrderEntities.getPaymentType())
                .accountSend(paySlipOrderEntities.getAccountSend())
                .accountReceive(paySlipOrderEntities.getAccountReceive())
                .createdAt(paySlipOrderEntities.getCreatedAt())
                .build();
    }
}
