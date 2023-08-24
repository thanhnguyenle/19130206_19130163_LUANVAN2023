package fitnlu.ntpos.paymentservice.application.ports.input;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ListReceiptInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;

public interface IFindReceiptInventoryEndpointPort {
    ListReceiptInventoryOutput findReceipts();
    ListReceiptInventoryOutput filterReceipts(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
}
