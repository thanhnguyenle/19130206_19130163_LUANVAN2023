package fitnlu.ntpos.paymentservice.application.usecases.receiptOrder;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IAddReceiptUseCase {
    Receipt addReceipt(Receipt receipt);
}
