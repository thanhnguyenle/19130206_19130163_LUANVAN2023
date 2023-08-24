package fitnlu.ntpos.paymentservice.application.services.paySlip;

import fitnlu.ntpos.paymentservice.application.ports.output.IWritePaySlipOrderPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IAddPaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IRemovePaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IUpdatePaySlipUseCase;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChangePaySlipOrderService implements IUpdatePaySlipUseCase, IRemovePaySlipUseCase, IAddPaySlipUseCase {
    private final IWritePaySlipOrderPort iWritePaySlipPort;
    @Override
    public PaySlip addPaySlip(PaySlip paySlip) {
        return iWritePaySlipPort.addPaySlip(paySlip);
    }

    @Override
    public boolean addBatchPaySlip(List<PaySlip> paySlips) {
        return iWritePaySlipPort.addBatchPaySlip(paySlips);
    }

    @Override
    public PaySlip removePaySlip(String id) {
        return iWritePaySlipPort.removePaySlip(id);
    }

    @Override
    public PaySlip updatePaySlip(String id, PaySlip paySlip) {
        return iWritePaySlipPort.updatePaySlip(id, paySlip);
    }
}
