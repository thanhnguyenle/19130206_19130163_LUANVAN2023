package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.ReceiptOrderMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IReceiptOrderDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IWriteReceiptOrderPort;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WriteReceiptOrderAdapter implements IWriteReceiptOrderPort {
    private final IReceiptOrderDBIRepository iPaySlipInventoryDBIRepository;

    @Override
    public Receipt addReceipt(Receipt receipt) {
        return ReceiptOrderMapperOutput.toDomain(iPaySlipInventoryDBIRepository.addReceipt(ReceiptOrderMapperOutput.toEntities(receipt)));
    }

    @Override
    public Receipt removeReceipt(String id) {
        return ReceiptOrderMapperOutput.toDomain(iPaySlipInventoryDBIRepository.removeReceipt(id));
    }

    @Override
    public Receipt updateReceipt(String id, Receipt receipt) {
        return ReceiptOrderMapperOutput.toDomain(iPaySlipInventoryDBIRepository.updateReceipt(id, ReceiptOrderMapperOutput.toEntities(receipt)));
    }
}
