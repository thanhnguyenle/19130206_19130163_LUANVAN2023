package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.PaySlipOrderMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IPaySlipOrderDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IWritePaySlipOrderPort;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WritePaySlipOrderAdapter implements IWritePaySlipOrderPort {
    private final IPaySlipOrderDBIRepository iPaySlipOrderDBIRepository;
    @Override
    public PaySlip addPaySlip(PaySlip paySlip) {
        return PaySlipOrderMapperOutput.toDomain(iPaySlipOrderDBIRepository.addPaySlip(PaySlipOrderMapperOutput.toEntities(paySlip)));
    }

    @Override
    public PaySlip removePaySlip(String id) {
        return PaySlipOrderMapperOutput.toDomain(iPaySlipOrderDBIRepository.removePaySlip(id));
    }

    @Override
    public PaySlip updatePaySlip(String id, PaySlip paySlip) {
        return PaySlipOrderMapperOutput.toDomain(iPaySlipOrderDBIRepository.updatePaySlip(id, PaySlipOrderMapperOutput.toEntities(paySlip)));
    }
}
