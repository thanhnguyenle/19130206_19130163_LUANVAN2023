package fitnlu.ntpos.paymentservice.application.ports.input;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptInventoryOutput;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;

public interface IChangeReceiptInventoryEndpointPort {
    ReceiptInventoryOutput addReceipt(ReceiptInventoryInput receiptInventoryInput);

    ReceiptInventoryOutput removeReceipt(String id) ;

    ReceiptInventoryOutput updateReceipt(String id, ReceiptInventoryInput receiptInventoryInput) ;
}
