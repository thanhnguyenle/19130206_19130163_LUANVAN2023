package fitnlu.ntpos.paymentservice.application.ports.output;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IWriteReceiptInventoryPort {
    Receipt addReceipt(Receipt receipt);

    Receipt removeReceipt(String id) ;

   Receipt updateReceipt(String id, Receipt receipt) ;
}
