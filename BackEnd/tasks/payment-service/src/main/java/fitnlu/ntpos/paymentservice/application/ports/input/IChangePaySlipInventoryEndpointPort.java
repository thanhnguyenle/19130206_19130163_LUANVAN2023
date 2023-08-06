package fitnlu.ntpos.paymentservice.application.ports.input;

import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;

public interface IChangePaySlipInventoryEndpointPort {
    PaySlipInventoryOutput addPaySlip(PaySlipInventoryInput paySlipInventoryInput);

    PaySlipInventoryOutput removePaySlip(String id);

    PaySlipInventoryOutput updatePaySlip(String id, PaySlipInventoryInput paySlipInventoryInput);
}
