package fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder;

import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFindPaySlipUseCase {
    List<PaySlip> findAllPaySlip();
    List<PaySlip> filterAllPaySlip(IPaging paging,TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<PaySlip> filterAllPaySlip(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
}
