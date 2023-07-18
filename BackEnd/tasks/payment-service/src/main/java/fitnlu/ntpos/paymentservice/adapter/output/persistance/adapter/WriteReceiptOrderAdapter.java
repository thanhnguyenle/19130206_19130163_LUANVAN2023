package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.PaySlipInventoryMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IPaySlipInventoryDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IWritePaySlipInventoryPort;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WriteReceiptOrderAdapter implements IWritePaySlipInventoryPort {
    private final IPaySlipInventoryDBIRepository iPaySlipInventoryDBIRepository;
    @Override
    public PaySlip addPaySlip(PaySlip paySlip) {
        return PaySlipInventoryMapperOutput.toDomain(iPaySlipInventoryDBIRepository.addPaySlip(PaySlipInventoryMapperOutput.toEntities(paySlip)));
    }

    @Override
    public PaySlip removePaySlip(String id) {
        return PaySlipInventoryMapperOutput.toDomain(iPaySlipInventoryDBIRepository.removePaySlip(id));
    }

    @Override
    public PaySlip updatePaySlip(String id, PaySlip paySlip) {
        return PaySlipInventoryMapperOutput.toDomain(iPaySlipInventoryDBIRepository.updatePaySlip(id, PaySlipInventoryMapperOutput.toEntities(paySlip)));
    }
}
