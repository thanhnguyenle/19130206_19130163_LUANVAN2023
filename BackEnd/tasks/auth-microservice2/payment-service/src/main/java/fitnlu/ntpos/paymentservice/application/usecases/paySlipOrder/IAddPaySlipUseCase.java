package fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

import java.util.List;

public interface IAddPaySlipUseCase {
    PaySlip addPaySlip(PaySlip paySlip);
    boolean addBatchPaySlip(List<PaySlip> paySlips);
}
