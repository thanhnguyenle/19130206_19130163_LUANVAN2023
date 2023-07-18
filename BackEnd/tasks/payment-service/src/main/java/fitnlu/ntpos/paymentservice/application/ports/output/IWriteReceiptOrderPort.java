package fitnlu.ntpos.paymentservice.application.ports.output;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IWriteReceiptPort {
    Receipt addReceipt(Receipt receipt);

    Receipt removeReceipt(String id) ;

   Receipt updateReceipt(String id, Receipt receipt) ;
}
