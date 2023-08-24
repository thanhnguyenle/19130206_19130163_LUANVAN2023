package fitnlu.ntpos.paymentservice.application.ports.input;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ListPaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;

public interface IFindPaySlipInventoryEndpointPort {
    ListPaySlipInventoryOutput findAllPaySlip();
    ListPaySlipInventoryOutput filterAllPaySlip(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
}
