package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.ReceiptInventoryMapperInput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.ReceiptInventoryMapperOutput;
import fitnlu.ntpos.paymentservice.application.ports.input.IChangeReceiptInventoryEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IAddPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IRemovePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IUpdatePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptInventory.IAddReceiptInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptInventory.IRemoveReceiptInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptInventory.IUpdateReceiptInventoryUseCase;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class ChangeReceiptInventoryEndpointAdapter implements IChangeReceiptInventoryEndpointPort {
    private final IAddReceiptInventoryUseCase iAddPaySlipUseCase;
    private final IRemoveReceiptInventoryUseCase iRemovePaySlipUseCase;
    private final IUpdateReceiptInventoryUseCase iUpdatePaySlipUseCase;

    @Override
    public ReceiptInventoryOutput addReceipt(ReceiptInventoryInput receiptInventoryInput) {
        return ReceiptInventoryMapperInput.toDTO(iAddPaySlipUseCase.addReceipt(ReceiptInventoryMapperInput.toDomain(receiptInventoryInput)));
    }

    @Override
    public ReceiptInventoryOutput removeReceipt(String id) {
        return ReceiptInventoryMapperInput.toDTO(iRemovePaySlipUseCase.removeReceipt(id));
    }

    @Override
    public ReceiptInventoryOutput updateReceipt(String id, ReceiptInventoryInput receiptInventoryInput) {
        return ReceiptInventoryMapperInput.toDTO(iUpdatePaySlipUseCase.updateReceipt(id, ReceiptInventoryMapperInput.toDomain(receiptInventoryInput)));
    }
}
