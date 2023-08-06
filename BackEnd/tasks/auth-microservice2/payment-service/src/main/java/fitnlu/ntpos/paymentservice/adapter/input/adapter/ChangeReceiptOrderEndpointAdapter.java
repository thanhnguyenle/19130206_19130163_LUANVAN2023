package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderOutput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipInventoryMapperInput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.ReceiptOrderMapperInput;
import fitnlu.ntpos.paymentservice.application.ports.input.IChangePaySlipInventoryEndpointPort;
import fitnlu.ntpos.paymentservice.application.ports.input.IChangeReceiptOrderEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IAddPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IRemovePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IUpdatePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IAddReceiptUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IRemoveReceiptUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IUpdateReceiptUseCase;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class ChangeReceiptOrderEndpointAdapter implements IChangeReceiptOrderEndpointPort {
    private final IAddReceiptUseCase iAddPaySlipUseCase;
    private final IRemoveReceiptUseCase iRemovePaySlipUseCase;
    private final IUpdateReceiptUseCase iUpdatePaySlipUseCase;

    @Override
    public ReceiptOrderOutput addReceipt(ReceiptOrderInput receiptOrderInput) {
        return ReceiptOrderMapperInput.toDTO(iAddPaySlipUseCase.addReceipt(ReceiptOrderMapperInput.toDomain(receiptOrderInput)));
    }

    @Override
    public ReceiptOrderOutput removeReceipt(String id) {
        return ReceiptOrderMapperInput.toDTO(iRemovePaySlipUseCase.removeReceipt(id));
    }

    @Override
    public ReceiptOrderOutput updateReceipt(String id, ReceiptOrderInput receiptOrderInput) {
        return ReceiptOrderMapperInput.toDTO(iUpdatePaySlipUseCase.updateReceipt(id, ReceiptOrderMapperInput.toDomain(receiptOrderInput)));
    }
}
