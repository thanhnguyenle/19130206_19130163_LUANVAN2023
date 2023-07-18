package fitnlu.ntpos.paymentservice.adapter.output.persistance.repository;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptOrderEntities;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IReceiptOrderDBIRepository {
    List<ReceiptOrderEntities> findReceipts();
    List<ReceiptOrderEntities> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<ReceiptOrderEntities> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    ReceiptOrderEntities addReceipt(ReceiptOrderEntities receiptOrderEntities);

    ReceiptOrderEntities removeReceipt(String id) ;

    ReceiptOrderEntities updateReceipt(String id, ReceiptOrderEntities receiptOrderEntities) ;
}
