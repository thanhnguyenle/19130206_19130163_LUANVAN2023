package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderReturnMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderTableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IFindReturnOrderEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.*;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.orderservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindReturnOrderEndpointAdapter implements IFindReturnOrderEndpointPort {
    private final IFindAllOrderReturnUseCase findAllOrderReturnUseCase;
    private final IFindOrderReturnUseCase findOrderReturnUseCase;
    private final IFindAllOrderTableByReturnOrderIDUseCase findAllOrderTableByReturnOrderIDUseCase;
    private final IFindAllOrderLineItemByReturnOrderIDUseCase findAllOrderLineItemByReturnOrderIDUseCase;
    private final IFindAllOrderReturnByOrderIDUseCase findAllOrderReturnByOrderIDUseCase;
    private final IFindAllOrderReturnByUserIDUseCase findAllOrderReturnByUserIDUseCase;
    @Override
    public List<OrderReturnOutput> findAllOrderReturn() {
        return findAllOrderReturnUseCase.findAllOrderReturn().stream().map(
                order -> {
                    OrderReturnOutput orderReturnOutput = OrderReturnMapperInput.toDTO(order);
                    //get category of products
                    List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByReturnOrderIDUseCase.findAllOrderLineItemByReturnOrderID(order.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
                    orderReturnOutput.setOrderLineItemsReturn(orderLineItemOutputs);

                    //get image of products
                    List<OrderTableOutput> tableOutputs = findAllOrderTableByReturnOrderIDUseCase.findAllOrderTableByReturnOrderID(order.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
                    orderReturnOutput.setTablesReturn(tableOutputs);
                    return orderReturnOutput;
                }
        ).toList();
}

    @Override
    public ListReturnOrderOutput findAllOrderReturn(PagingInput pagingInput, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<OrderReturn> orderReturns = findAllOrderReturnUseCase.findAllOrderReturn( timeSearch,sortType, sortValue, searchType, searchValue);
        int totalItem = orderReturns.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<OrderReturnOutput> orderOutputs = orderReturns.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(order -> {
                OrderReturnOutput orderReturnOutput = OrderReturnMapperInput.toDTO(order);

                //get category of products
                List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByReturnOrderIDUseCase.findAllOrderLineItemByReturnOrderID(order.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
                orderReturnOutput.setOrderLineItemsReturn(orderLineItemOutputs);

                //get image of products
                List<OrderTableOutput> tableOutputs = findAllOrderTableByReturnOrderIDUseCase.findAllOrderTableByReturnOrderID(order.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
                orderReturnOutput.setTablesReturn(tableOutputs);
                return orderReturnOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListReturnOrderOutput.builder()
                    .ordersReturn(orderOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListReturnOrderOutput.builder()
                    .ordersReturn(orderReturns.stream().map(order -> {
                        OrderReturnOutput orderOutput = OrderReturnMapperInput.toDTO(order);

                        //get category of products
                        List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByReturnOrderIDUseCase.findAllOrderLineItemByReturnOrderID(order.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
                        orderOutput.setOrderLineItemsReturn(orderLineItemOutputs);

                        //get image of products
                        List<OrderTableOutput> tableOutputs = findAllOrderTableByReturnOrderIDUseCase.findAllOrderTableByReturnOrderID(order.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
                        orderOutput.setTablesReturn(tableOutputs);
                        return orderOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(orderReturns.size())
                    .build();
        }
    }

    @Override
    public OrderReturnOutput findOrderReturn(String id) {
        OrderReturn orderReturn = findOrderReturnUseCase.findOrderReturn(id);
        OrderReturnOutput orderReturnOutput = OrderReturnMapperInput.toDTO(orderReturn);
        //get category of products
        List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByReturnOrderIDUseCase.findAllOrderLineItemByReturnOrderID(id).stream().map(OrderLineItemMapperInput::toDTO).toList();
        orderReturnOutput.setOrderLineItemsReturn(orderLineItemOutputs);
        //get image of products
        List<OrderTableOutput> tableOutputs = findAllOrderTableByReturnOrderIDUseCase.findAllOrderTableByReturnOrderID(id).stream().map(OrderTableMapperInput::toDTO).toList();
        orderReturnOutput.setTablesReturn(tableOutputs);
        return orderReturnOutput;
    }

    @Override
    public List<OrderTableOutput> findAllOrderTableByReturnOrderID(String returnOrderID) {
        return findAllOrderTableByReturnOrderIDUseCase.findAllOrderTableByReturnOrderID(returnOrderID).stream().map(OrderTableMapperInput::toDTO).toList();
    }

    @Override
    public List<OrderLineItemOutput> findAllOrderLineItemByReturnOrderID(String returnOrderID) {
        return findAllOrderLineItemByReturnOrderIDUseCase.findAllOrderLineItemByReturnOrderID(returnOrderID).stream().map(OrderLineItemMapperInput::toDTO).toList();
    }

    @Override
    public List<OrderReturnOutput> findAllOrderReturnByOrderID(String orderID) {
        return findAllOrderReturnByOrderIDUseCase.findAllOrderReturnByOrderID(orderID).stream().map(orderReturn -> {
            OrderReturnOutput orderReturnOutput = OrderReturnMapperInput.toDTO(orderReturn);
            //get category of products
            List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByReturnOrderIDUseCase.findAllOrderLineItemByReturnOrderID(orderReturn.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
            orderReturnOutput.setOrderLineItemsReturn(orderLineItemOutputs);

            //get image of products
            List<OrderTableOutput> tableOutputs = findAllOrderTableByReturnOrderIDUseCase.findAllOrderTableByReturnOrderID(orderReturn.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
            orderReturnOutput.setTablesReturn(tableOutputs);
            return orderReturnOutput;
        }).toList();
    }

    @Override
    public List<OrderReturnOutput> findAllOrderReturnByUserID(String userID) {
        return findAllOrderReturnByUserIDUseCase.findAllOrderReturnByUserID(userID).stream().map(orderReturn -> {
            OrderReturnOutput orderReturnOutput = OrderReturnMapperInput.toDTO(orderReturn);
            //get category of products
            List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByReturnOrderIDUseCase.findAllOrderLineItemByReturnOrderID(orderReturn.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
            orderReturnOutput.setOrderLineItemsReturn(orderLineItemOutputs);

            //get image of products
            List<OrderTableOutput> tableOutputs = findAllOrderTableByReturnOrderIDUseCase.findAllOrderTableByReturnOrderID(orderReturn.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
            orderReturnOutput.setTablesReturn(tableOutputs);
            return orderReturnOutput;
        }).toList();
    }
}
