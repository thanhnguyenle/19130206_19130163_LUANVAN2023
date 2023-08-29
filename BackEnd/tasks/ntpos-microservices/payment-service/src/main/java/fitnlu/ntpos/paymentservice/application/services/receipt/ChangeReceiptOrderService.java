package fitnlu.ntpos.paymentservice.application.services.receipt;

import fitnlu.ntpos.paymentservice.application.ports.output.IWriteReceiptOrderPort;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IAddReceiptUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IRemoveReceiptUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IUpdateReceiptUseCase;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChangeReceiptOrderService implements IUpdateReceiptUseCase, IAddReceiptUseCase, IRemoveReceiptUseCase {
    private final IWriteReceiptOrderPort iReceiptOrderDBIRepository;
    @Override
    public Receipt addReceipt(Receipt receipt) {
        return iReceiptOrderDBIRepository.addReceipt(receipt);
    }

    @Override
    public Receipt removeReceipt(String id) {
        return iReceiptOrderDBIRepository.removeReceipt(id);
    }

    @Override
    public Receipt updateReceipt(String id, Receipt receipt) {
        return iReceiptOrderDBIRepository.updateReceipt(id, receipt);
    }
}
