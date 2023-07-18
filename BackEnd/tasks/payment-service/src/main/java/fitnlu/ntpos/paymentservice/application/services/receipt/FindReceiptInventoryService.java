package fitnlu.ntpos.paymentservice.application.services.receipt;

import fitnlu.ntpos.paymentservice.application.usecases.receipt.IFindReceiptUseCase;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FindReceiptInventoryService implements IFindReceiptUseCase {

    @Override
    public List<Receipt> findReceipts() {
        return null;
    }

    @Override
    public List<Receipt> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return null;
    }

    @Override
    public List<Receipt> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return null;
    }
}
