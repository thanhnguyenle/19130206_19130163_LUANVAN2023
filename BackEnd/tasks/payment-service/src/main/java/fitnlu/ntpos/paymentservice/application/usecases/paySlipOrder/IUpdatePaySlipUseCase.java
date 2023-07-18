package fitnlu.ntpos.paymentservice.application.usecases.paySlip;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IUpdatePaySlipUseCase {
    PaySlip updatePaySlip(String id, PaySlip paySlip);
}
