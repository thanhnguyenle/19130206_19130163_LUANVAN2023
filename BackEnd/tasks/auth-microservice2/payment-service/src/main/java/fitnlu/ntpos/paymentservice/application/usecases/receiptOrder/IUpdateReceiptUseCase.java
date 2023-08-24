package fitnlu.ntpos.paymentservice.application.usecases.receiptOrder;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IUpdateReceiptUseCase {
    Receipt updateReceipt(String id, Receipt receipt);
}
