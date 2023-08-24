package fitnlu.ntpos.paymentservice.application.ports.output;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

import java.util.List;

public interface IWritePaySlipOrderPort {
    PaySlip addPaySlip(PaySlip paySlip);

    PaySlip removePaySlip(String id);

    PaySlip updatePaySlip(String id, PaySlip paySlip);

    boolean addBatchPaySlip(List<PaySlip> paySlips);
}
