package fitnlu.ntpos.paymentservice.application.services.receipt;

import fitnlu.ntpos.paymentservice.application.ports.output.IReadReceiptOrderPort;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IFindReceiptUseCase;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FindReceiptOrderService implements IFindReceiptUseCase {
    private final IReadReceiptOrderPort iReceiptOrderDBIRepository;
    @Override
    public List<Receipt> findReceipts() {
        return iReceiptOrderDBIRepository.findReceipts();
    }

    @Override
    public List<Receipt> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptOrderDBIRepository.filterReceipts(paging, timeSearch, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Receipt> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptOrderDBIRepository.filterReceipts(timeSearch, searchType, searchValue, sortType, sortValue);
    }
}
