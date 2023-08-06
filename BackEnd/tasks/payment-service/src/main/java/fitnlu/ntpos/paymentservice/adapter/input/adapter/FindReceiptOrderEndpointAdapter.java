package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.*;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.ReceiptOrderMapperInput;
import fitnlu.ntpos.paymentservice.application.ports.input.IFindReceiptOrderEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.receiptOrder.IFindReceiptUseCase;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.paymentservice.infrastructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindReceiptOrderEndpointAdapter implements IFindReceiptOrderEndpointPort {
    private final IFindReceiptUseCase iFindReceiptUseCase;
    @Override
    public ListReceiptOrderOutput findReceipts() {
        List<ReceiptOrderOutput> receiptOrderOutputList = iFindReceiptUseCase.findReceipts().stream().map(ReceiptOrderMapperInput::toDTO).toList();
        return ListReceiptOrderOutput.builder()
                .receiptOrderOutputs(receiptOrderOutputList)
                .currentPage(1)
                .totalItem(receiptOrderOutputList.size())
                .totalPage(1)
                .build();
    }

    @Override
    public ListReceiptOrderOutput filterReceipts(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<ReceiptOrderOutput> paySlips = iFindReceiptUseCase.filterReceipts(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(ReceiptOrderMapperInput::toDTO).toList();
        int totalItem = paySlips.size();
        if(ipaging!=null){
            List<ReceiptOrderOutput> paySlipInventoryOutputs = paySlips.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListReceiptOrderOutput.builder()
                    .receiptOrderOutputs(paySlipInventoryOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListReceiptOrderOutput.builder()
                .receiptOrderOutputs(paySlips)
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }
}
