package fitnlu.ntpos.paymentservice.application.ports.input;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ListPaySlipOrderOutput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;

public interface IFindPaySlipOrderEndpointPort {
    ListPaySlipOrderOutput findAllPaySlip();
    ListPaySlipOrderOutput filterAllPaySlip(PagingInput paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
}
