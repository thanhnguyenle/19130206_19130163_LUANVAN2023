package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.application.ports.output.IWritePaySlipPort;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WritePaySlipAdapter implements IWritePaySlipPort {

    @Override
    public PaySlip addPaySlip(PaySlip paySlip) {
        return null;
    }

    @Override
    public PaySlip removePaySlip(String id) {
        return null;
    }

    @Override
    public PaySlip updatePaySlip(String id, PaySlip paySlip) {
        return null;
    }
}
