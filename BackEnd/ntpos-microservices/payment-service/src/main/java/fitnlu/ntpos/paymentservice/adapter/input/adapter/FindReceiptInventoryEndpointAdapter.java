package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.*;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipOrderMapperInput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.ReceiptInventoryMapperInput;
import fitnlu.ntpos.paymentservice.application.ports.input.IFindReceiptInventoryEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.receiptInventory.IFindReceiptInventoryUseCase;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.paymentservice.infrastructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindReceiptInventoryEndpointAdapter implements IFindReceiptInventoryEndpointPort {
    private final IFindReceiptInventoryUseCase iFindReceiptInventoryUseCase;
    @Override
    public ListReceiptInventoryOutput findReceipts() {
        List<ReceiptInventoryOutput> receiptInventoryOutputs = iFindReceiptInventoryUseCase.findReceipts().stream().map(ReceiptInventoryMapperInput::toDTO).toList();
        return ListReceiptInventoryOutput.builder()
                .receiptInventoryOutputs(receiptInventoryOutputs)
                .currentPage(1)
                .totalItem(receiptInventoryOutputs.size())
                .totalPage(1)
                .build();
    }

    @Override
    public ListReceiptInventoryOutput filterReceipts(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<ReceiptInventoryOutput> paySlips = iFindReceiptInventoryUseCase.filterReceipts(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(ReceiptInventoryMapperInput::toDTO).toList();
        int totalItem = paySlips.size();
        if(ipaging!=null){
            List<ReceiptInventoryOutput> paySlipInventoryOutputs = paySlips.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListReceiptInventoryOutput.builder()
                    .receiptInventoryOutputs(paySlipInventoryOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListReceiptInventoryOutput.builder()
                .receiptInventoryOutputs(paySlips)
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }
}
