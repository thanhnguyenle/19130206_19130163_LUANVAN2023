package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.ReceiptInventoryMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IReceiptInventoryDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IWriteReceiptInventoryPort;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WriteReceiptInventoryAdapter implements IWriteReceiptInventoryPort {
    private final IReceiptInventoryDBIRepository iPaySlipInventoryDBIRepository;

    @Override
    public Receipt addReceipt(Receipt receipt) {
        return ReceiptInventoryMapperOutput.toDomain(iPaySlipInventoryDBIRepository.addReceipt(ReceiptInventoryMapperOutput.toEntities(receipt)));
    }

    @Override
    public Receipt removeReceipt(String id) {
        return ReceiptInventoryMapperOutput.toDomain(iPaySlipInventoryDBIRepository.removeReceipt(id));
    }

    @Override
    public Receipt updateReceipt(String id, Receipt receipt) {
        return ReceiptInventoryMapperOutput.toDomain(iPaySlipInventoryDBIRepository.updateReceipt(id, ReceiptInventoryMapperOutput.toEntities(receipt)));
    }
}
