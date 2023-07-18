package fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IUpdatePaySlipUseCase {
    PaySlip updatePaySlip(String id, PaySlip paySlip);
}
