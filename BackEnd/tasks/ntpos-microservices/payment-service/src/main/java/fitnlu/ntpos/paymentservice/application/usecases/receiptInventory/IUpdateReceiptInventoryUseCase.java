package fitnlu.ntpos.paymentservice.application.usecases.receiptInventory;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IUpdateReceiptInventoryUseCase {
    Receipt updateReceipt(String id, Receipt receipt);
}
