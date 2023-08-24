package fitnlu.ntpos.paymentservice.application.ports.input;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderOutput;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IChangeReceiptOrderEndpointPort {
    ReceiptOrderOutput addReceipt(ReceiptOrderInput receiptOrderInput);

    ReceiptOrderOutput removeReceipt(String id) ;

    ReceiptOrderOutput updateReceipt(String id, ReceiptOrderInput receiptOrderInput) ;
}
