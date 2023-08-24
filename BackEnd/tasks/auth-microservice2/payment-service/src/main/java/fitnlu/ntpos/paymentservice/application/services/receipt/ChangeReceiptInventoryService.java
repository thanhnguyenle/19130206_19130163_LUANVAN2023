package fitnlu.ntpos.paymentservice.application.services.receipt;

import fitnlu.ntpos.paymentservice.application.ports.output.IWriteReceiptInventoryPort;
import fitnlu.ntpos.paymentservice.application.usecases.receiptInventory.IAddReceiptInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptInventory.IRemoveReceiptInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptInventory.IUpdateReceiptInventoryUseCase;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChangeReceiptInventoryService implements IUpdateReceiptInventoryUseCase, IAddReceiptInventoryUseCase, IRemoveReceiptInventoryUseCase {
    private final IWriteReceiptInventoryPort iReceiptInventoryDBIRepository;
    @Override
    public Receipt addReceipt(Receipt receipt) {
        return iReceiptInventoryDBIRepository.addReceipt(receipt);
    }

    @Override
    public Receipt removeReceipt(String id) {
        return iReceiptInventoryDBIRepository.removeReceipt(id);
    }

    @Override
    public Receipt updateReceipt(String id, Receipt receipt) {
        return iReceiptInventoryDBIRepository.updateReceipt(id, receipt);
    }
}
