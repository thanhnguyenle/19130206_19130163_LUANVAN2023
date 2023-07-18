package fitnlu.ntpos.paymentservice.application.services.receipt;

import fitnlu.ntpos.paymentservice.application.usecases.receipt.IAddReceiptUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receipt.IRemoveReceiptUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.receipt.IUpdateReceiptUseCase;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChangeReceiptInventoryService implements IUpdateReceiptUseCase, IAddReceiptUseCase, IRemoveReceiptUseCase {
    @Override
    public Receipt addReceipt(Receipt receipt) {
        return null;
    }

    @Override
    public Receipt removeReceipt(String id) {
        return null;
    }

    @Override
    public Receipt updateReceipt(String id, Receipt receipt) {
        return null;
    }
}
