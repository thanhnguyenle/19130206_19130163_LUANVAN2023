package fitnlu.ntpos.paymentservice.application.ports.output;

import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IReadReceiptPort {
    List<Receipt> findReceipts();
    List<Receipt> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<Receipt> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);

}
