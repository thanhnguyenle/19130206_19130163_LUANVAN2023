package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.ListOrderLineItemsOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IFindOrderLineItemEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IFindAllOrderLineItemByOrderIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IFindOrderLineItemByIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.orderservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindOrderLineItemEndpointAdapter implements IFindOrderLineItemEndpointPort {
    private final IFindOrderLineItemByIDUseCase findOrderLineItemByIDUseCase;
    private final IFindAllOrderLineItemByOrderIDUseCase findAllOrderLineItemByOrderIDUseCase;
    @Override
    public ListOrderLineItemsOutput findAllOrderLineItemByOrderID(String orderID) {
        List<OrderLineItemOutput> productsOutputs = findAllOrderLineItemByOrderIDUseCase.findAllOrderLineItemByOrderID(orderID).stream().map(OrderLineItemMapperInput::toDTO).toList();
        return ListOrderLineItemsOutput.builder()
                .orderLineItemOutputs(productsOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(productsOutputs.size())
                .build();
    }

    @Override
    public ListOrderLineItemsOutput filterAllOrderLineItemByOrderID(PagingInput pagingInput, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging paging = pagingInput!=null?new PageRequest(pagingInput.page(),pagingInput.limit()):null;
        List<OrderProduct> orders = findAllOrderLineItemByOrderIDUseCase.filterAllOrderLineItemByOrderID(orderID,searchType,searchValue,sortType,sortValue);
        int totalItem = orders.size();
        if(paging!=null && paging.getPage()!=null){
            List<OrderLineItemOutput> productsOutputs = orders.stream().skip(paging.getOffset()).limit(paging.getLimit()).map(OrderLineItemMapperInput::toDTO).toList();
            int totalPage = totalItem%paging.getLimit()==0?totalItem/paging.getLimit():totalItem/paging.getLimit()+1;
            return ListOrderLineItemsOutput.builder()
                    .orderLineItemOutputs(productsOutputs)
                    .currentPage(paging.getPage())
                    .totalPage(totalPage<=0?1:totalPage)
                    .totalItem(totalItem)
                    .build();
        }else{
            return ListOrderLineItemsOutput.builder()
                    .orderLineItemOutputs(orders.stream().map(OrderLineItemMapperInput::toDTO).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(orders.size())
                    .build();
        }
    }

    @Override
    public OrderLineItemOutput findOrderLineItemByID(String id) {
        return OrderLineItemMapperInput.toDTO(findOrderLineItemByIDUseCase.findOrderLineItemByID(id));
    }
}
