package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.paymentservice.adapter.input.dto.ListPaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PaySlipInventoryOutput;
import fitnlu.ntpos.paymentservice.adapter.input.mapper.PaySlipInventoryMapperInput;
import fitnlu.ntpos.paymentservice.application.ports.input.IChangePaySlipInventoryEndpointPort;
import fitnlu.ntpos.paymentservice.application.ports.input.IFindPaySlipInventoryEndpointPort;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IAddPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IFindPaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IRemovePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipInventory.IUpdatePaySlipInventoryUseCase;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.paymentservice.infrastructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindPaySlipInventoryEndpointAdapter implements IFindPaySlipInventoryEndpointPort {
    private final IFindPaySlipInventoryUseCase iAddPaySlipUseCase;

    @Override
    public ListPaySlipInventoryOutput findAllPaySlip() {
        List<PaySlipInventoryOutput> paySlips = iAddPaySlipUseCase.findAllPaySlip().stream().map(PaySlipInventoryMapperInput::toDTO).toList();
        return ListPaySlipInventoryOutput.builder()
                .paySlipInventoryOutputs(paySlips)
                .currentPage(1)
                .totalPage(1)
                .totalItem(paySlips.size())
                .build();
    }

    @Override
    public ListPaySlipInventoryOutput filterAllPaySlip(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<PaySlipInventoryOutput> paySlips = iAddPaySlipUseCase.filterAllPaySlip(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(PaySlipInventoryMapperInput::toDTO).toList();
        int totalItem = paySlips.size();
        if(ipaging!=null){
            List<PaySlipInventoryOutput> paySlipInventoryOutputs = paySlips.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListPaySlipInventoryOutput.builder()
                    .paySlipInventoryOutputs(paySlipInventoryOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListPaySlipInventoryOutput.builder()
                .paySlipInventoryOutputs(paySlips)
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }
}
