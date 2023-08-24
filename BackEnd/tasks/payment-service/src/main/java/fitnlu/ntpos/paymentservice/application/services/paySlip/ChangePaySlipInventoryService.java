package fitnlu.ntpos.paymentservice.application.services.paySlip;

import fitnlu.ntpos.paymentservice.application.ports.output.IWritePaySlipInventoryPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IAddPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IRemovePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IUpdatePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IAddPaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IRemovePaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IUpdatePaySlipUseCase;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChangePaySlipInventoryService implements IUpdatePaySlipInventoryUseCase, IRemovePaySlipInventoryUseCase, IAddPaySlipInventoryUseCase {
    private final IWritePaySlipInventoryPort iWritePaySlipPort;
    @Override
    public PaySlip addPaySlip(PaySlip paySlip) {
        return iWritePaySlipPort.addPaySlip(paySlip);
    }

    @Override
    public PaySlip removePaySlip(String id) {
        return iWritePaySlipPort.removePaySlip(id);
    }

    @Override
    public PaySlip updatePaySlip(String id, PaySlip paySlip) {
        return iWritePaySlipPort.updatePaySlip(id, paySlip);
    }
}
