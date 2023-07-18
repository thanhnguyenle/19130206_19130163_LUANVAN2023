package fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IRemovePaySlipUseCase {
    PaySlip removePaySlip(String id);
}
