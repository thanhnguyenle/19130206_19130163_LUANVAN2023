package fitnlu.ntpos.paymentservice.application.services.paySlip;

import fitnlu.ntpos.paymentservice.application.ports.output.IReadPaySlipInventoryPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IFindPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IFindPaySlipUseCase;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindPaySlipInventoryService implements IFindPaySlipInventoryUseCase {
    private final IReadPaySlipInventoryPort iReadPaySlipInventoryPort;
    @Override
    public List<PaySlip> findAllPaySlip() {
        return iReadPaySlipInventoryPort.findAllPaySlip();
    }

    @Override
    public List<PaySlip> filterAllPaySlip(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReadPaySlipInventoryPort.filterAllPaySlip(paging, timeSearch, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<PaySlip> filterAllPaySlip(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReadPaySlipInventoryPort.filterAllPaySlip(timeSearch, searchType, searchValue, sortType, sortValue);
    }
}
