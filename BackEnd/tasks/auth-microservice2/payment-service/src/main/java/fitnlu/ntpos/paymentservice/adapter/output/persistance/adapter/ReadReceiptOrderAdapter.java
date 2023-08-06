package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.ReceiptOrderMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IReceiptOrderDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadReceiptOrderPort;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class ReadReceiptOrderAdapter implements IReadReceiptOrderPort {
    private final IReceiptOrderDBIRepository iReceiptOrderDBIRepository;
    @Override
    public List<Receipt> findReceipts() {
        return iReceiptOrderDBIRepository.findReceipts().stream().map(ReceiptOrderMapperOutput::toDomain).toList();
    }

    @Override
    public List<Receipt> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptOrderDBIRepository.filterReceipts(paging, timeSearch, searchType, searchValue, sortType, sortValue).stream().map(ReceiptOrderMapperOutput::toDomain).toList();
    }

    @Override
    public List<Receipt> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptOrderDBIRepository.filterReceipts(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(ReceiptOrderMapperOutput::toDomain).toList();
    }
}
