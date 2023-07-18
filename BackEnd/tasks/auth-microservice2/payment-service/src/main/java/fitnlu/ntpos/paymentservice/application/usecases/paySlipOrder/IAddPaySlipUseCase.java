package fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IAddPaySlipUseCase {
    PaySlip addPaySlip(PaySlip paySlip);
}
