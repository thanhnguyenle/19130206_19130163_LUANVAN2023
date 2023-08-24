package fitnlu.ntpos.paymentservice.application.usecases.receiptInventory;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IRemoveReceiptInventoryUseCase {
    Receipt removeReceipt(String id);
}
