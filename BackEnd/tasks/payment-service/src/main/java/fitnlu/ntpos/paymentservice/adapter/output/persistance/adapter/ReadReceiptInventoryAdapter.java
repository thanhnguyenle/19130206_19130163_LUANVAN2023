package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.ReceiptInventoryMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IReceiptInventoryDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadReceiptInventoryPort;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadReceiptOrderPort;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadReceiptInventoryAdapter implements IReadReceiptInventoryPort {
    private final IReceiptInventoryDBIRepository iReceiptInventoryDBIRepository;
    @Override
    public List<Receipt> findReceipts() {
        return iReceiptInventoryDBIRepository.findReceipts().stream().map(ReceiptInventoryMapperOutput::toDomain).toList();
    }

    @Override
    public List<Receipt> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptInventoryDBIRepository.filterReceipts(paging, timeSearch, searchType, searchValue, sortType, sortValue).stream().map(ReceiptInventoryMapperOutput::toDomain).toList();
    }

    @Override
    public List<Receipt> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptInventoryDBIRepository.filterReceipts(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(ReceiptInventoryMapperOutput::toDomain).toList();
    }
}
