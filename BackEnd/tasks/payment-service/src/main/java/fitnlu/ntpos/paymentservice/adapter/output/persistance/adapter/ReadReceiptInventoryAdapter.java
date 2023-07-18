package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.application.ports.output.IReadReceiptPort;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadMaterialInventoryAdapter implements IReadReceiptPort {

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
