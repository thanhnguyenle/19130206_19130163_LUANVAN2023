package fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IUpdatePaySlipInventoryUseCase {
    PaySlip updatePaySlip(String id, PaySlip paySlip);
}
