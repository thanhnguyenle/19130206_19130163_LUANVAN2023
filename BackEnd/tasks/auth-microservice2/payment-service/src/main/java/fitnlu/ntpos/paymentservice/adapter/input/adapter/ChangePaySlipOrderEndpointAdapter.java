package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipOrderInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipOrderOutput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipInventoryMapperInput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipOrderMapperInput;
import fitnlu.ntpos.paymentservice.application.ports.input.IChangePaySlipInventoryEndpointPort;
import fitnlu.ntpos.paymentservice.application.ports.input.IChangePaySlipOrderEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IAddPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IRemovePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IUpdatePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IAddPaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IRemovePaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IUpdatePaySlipUseCase;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class ChangePaySlipOrderEndpointAdapter implements IChangePaySlipOrderEndpointPort {
    private final IAddPaySlipUseCase iAddPaySlipUseCase;
    private final IRemovePaySlipUseCase iRemovePaySlipUseCase;
    private final IUpdatePaySlipUseCase iUpdatePaySlipUseCase;

    @Override
    public PaySlipOrderOutput addPaySlip(PaySlipOrderInput paySlipOrderInput) {
        return PaySlipOrderMapperInput.toDTO(iAddPaySlipUseCase.addPaySlip(PaySlipOrderMapperInput.toDomain(paySlipOrderInput)));
    }

    @Override
    public PaySlipOrderOutput removePaySlip(String id) {
        return PaySlipOrderMapperInput.toDTO(iRemovePaySlipUseCase.removePaySlip(id));
    }

    @Override
    public PaySlipOrderOutput updatePaySlip(String id, PaySlipOrderInput paySlipOrderInput) {
        return PaySlipOrderMapperInput.toDTO(iUpdatePaySlipUseCase.updatePaySlip(id, PaySlipOrderMapperInput.toDomain(paySlipOrderInput)));
    }
}
