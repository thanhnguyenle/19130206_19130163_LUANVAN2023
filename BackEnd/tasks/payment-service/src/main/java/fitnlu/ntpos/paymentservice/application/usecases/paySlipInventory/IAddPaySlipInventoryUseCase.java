package fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IAddPaySlipUseCase {
    PaySlip addPaySlip(PaySlip paySlip);
}
