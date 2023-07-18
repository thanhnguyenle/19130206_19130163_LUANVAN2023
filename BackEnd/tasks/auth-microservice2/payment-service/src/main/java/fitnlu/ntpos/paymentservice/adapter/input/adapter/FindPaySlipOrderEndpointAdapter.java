package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.*;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipInventoryMapperInput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipOrderMapperInput;
import fitnlu.ntpos.paymentservice.application.ports.input.IFindPaySlipOrderEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IFindPaySlipUseCase;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.paymentservice.infrastructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindPaySlipOrderEndpointAdapter implements IFindPaySlipOrderEndpointPort {
    private final IFindPaySlipUseCase iFindPaySlipUseCase;

    @Override
    public ListPaySlipOrderOutput findAllPaySlip() {
        List<PaySlipOrderOutput> paySlipOrderOutputList = iFindPaySlipUseCase.findAllPaySlip().stream().map(PaySlipOrderMapperInput::toDTO).toList();
        return ListPaySlipOrderOutput.builder()
                .paySlipOrderOutputs(paySlipOrderOutputList)
                .currentPage(1)
                .totalPage(1)
                .totalItem(paySlipOrderOutputList.size())
                .build();
    }

    @Override
    public ListPaySlipOrderOutput filterAllPaySlip(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<PaySlipOrderOutput> paySlips = iFindPaySlipUseCase.filterAllPaySlip(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(PaySlipOrderMapperInput::toDTO).toList();
        int totalItem = paySlips.size();
        if(ipaging!=null){
            List<PaySlipOrderOutput> paySlipInventoryOutputs = paySlips.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListPaySlipOrderOutput.builder()
                    .paySlipOrderOutputs(paySlipInventoryOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListPaySlipOrderOutput.builder()
                .paySlipOrderOutputs(paySlips)
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }
}
