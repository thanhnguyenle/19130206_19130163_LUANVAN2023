package fitnlu.ntpos.paymentservice.application.services.paySlip;

import fitnlu.ntpos.paymentservice.application.usecases.paySlip.IAddPaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlip.IRemovePaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlip.IUpdatePaySlipUseCase;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChangePaySlipService implements IUpdatePaySlipUseCase, IRemovePaySlipUseCase, IAddPaySlipUseCase {
    private final IWritePaySlipPort iWritePaySlipPort;
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
