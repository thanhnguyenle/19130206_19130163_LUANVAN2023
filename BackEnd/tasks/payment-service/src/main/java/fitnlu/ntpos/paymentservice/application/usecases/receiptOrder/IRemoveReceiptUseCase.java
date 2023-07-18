package fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.receipt;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IRemoveReceiptUseCase {
    Receipt removeReceipt(String id);
}
