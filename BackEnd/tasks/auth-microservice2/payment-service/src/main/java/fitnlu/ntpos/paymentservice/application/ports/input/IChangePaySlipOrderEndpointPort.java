package fitnlu.ntpos.paymentservice.application.ports.input;

import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipOrderInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipOrderOutput;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IChangePaySlipOrderEndpointPort {
    PaySlipOrderOutput addPaySlip(PaySlipOrderInput paySlipOrderInput);

    PaySlipOrderOutput removePaySlip(String id);

    PaySlipOrderOutput updatePaySlip(String id, PaySlipOrderInput paySlipOrderInput);
}
