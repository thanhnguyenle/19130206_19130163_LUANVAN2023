package fitnlu.ntpos.paymentservice.application.ports.output;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IWritePaySlipInventoryPort {
    PaySlip addPaySlip(PaySlip paySlip);

    PaySlip removePaySlip(String id);

    PaySlip updatePaySlip(String id, PaySlip paySlip);
}
