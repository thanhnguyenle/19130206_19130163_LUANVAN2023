package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipInventoryMapperInput;
import fitnlu.ntpos.paymentservice.application.ports.input.IChangePaySlipInventoryEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IAddPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IRemovePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IUpdatePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class ChangePaySlipOrderEndpointAdapter implements IChangePaySlipInventoryEndpointPort {
    private final IAddPaySlipInventoryUseCase iAddPaySlipUseCase;
    private final IRemovePaySlipInventoryUseCase iRemovePaySlipUseCase;
    private final IUpdatePaySlipInventoryUseCase iUpdatePaySlipUseCase;
    @Override
    public PaySlipInventoryOutput addPaySlip(PaySlipInventoryInput paySlipInventoryInput) {
        return PaySlipInventoryMapperInput.toDTO(iAddPaySlipUseCase.addPaySlip(PaySlipInventoryMapperInput.toDomain(paySlipInventoryInput)));
    }

    @Override
    public PaySlipInventoryOutput removePaySlip(String id) {
        return PaySlipInventoryMapperInput.toDTO(iRemovePaySlipUseCase.removePaySlip(id));
    }

    @Override
    public PaySlipInventoryOutput updatePaySlip(String id, PaySlipInventoryInput paySlipInventoryInput) {
        return PaySlipInventoryMapperInput.toDTO(iUpdatePaySlipUseCase.updatePaySlip(id, PaySlipInventoryMapperInput.toDomain(paySlipInventoryInput)));
    }
}
