package fitnlu.ntpos.paymentservice.application.services.paySlip;

import fitnlu.ntpos.paymentservice.application.usecases.paySlip.IFindPaySlipUseCase;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;

import java.util.List;

public class FindPaySlipService implements IFindPaySlipUseCase {

    @Override
    public List<PaySlip> findAllPaySlip() {
        return null;
    }

    @Override
    public List<PaySlip> filterAllPaySlip(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return null;
    }

    @Override
    public List<PaySlip> filterAllPaySlip(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return null;
    }
}
