package fitnlu.ntpos.paymentservice.adapter.output.persistance.repository;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptInventoryEntities;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptOrderEntities;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IReceiptInventoryDBIRepository {
    List<ReceiptInventoryEntities> findReceipts();
    List<ReceiptInventoryEntities> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<ReceiptInventoryEntities> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    ReceiptInventoryEntities addReceipt(ReceiptInventoryEntities receiptInventoryEntities);

    ReceiptInventoryEntities removeReceipt(String id) ;

    ReceiptInventoryEntities updateReceipt(String id, ReceiptInventoryEntities receiptInventoryEntities) ;
}
