package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.TableMapperInput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderLineItemMapperOutput;
import fitnlu.ntpos.orderservice.application.ports.input.IFindOrderEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderByUserIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindOrderByIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IFindAllOrderLineItemByOrderIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindAllOrderTableByOrderIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindAllOrderTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindOrderTableByIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindAllTableByOrderIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.orderservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindOrderEndpointAdapter implements IFindOrderEndpointPort {
    private final IFindAllOrderUseCase findAllOrderUseCase;
    private final IFindOrderByIDUseCase findOrderByIDUseCase;
    private final IFindAllOrderByUserIDUseCase findAllOrderByUserIDUseCase;
    private final IFindAllOrderLineItemByOrderIDUseCase findAllOrderLineItemByOrderIDUseCase;
    private final IFindAllOrderTableByOrderIDUseCase findAllOrderTableByOrderIDUseCase;
    @Override
    public List<OrderOutput> findAllOrderByUserID(String userID) {
        return findAllOrderByUserIDUseCase.findAllOrderByUserID(userID).stream().map(order -> {
            OrderOutput orderOutput = OrderMapperInput.toDTO(order);

            //get category of products
            List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByOrderIDUseCase.findAllOrderLineItemByOrderID(order.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
            orderOutput.setOrderLineItems(orderLineItemOutputs);

            //get image of products
            List<OrderTableOutput> tableOutputs = findAllOrderTableByOrderIDUseCase.findAllOrderTableByOrderID(order.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
            orderOutput.setTables(tableOutputs);
            return orderOutput;
        }).toList();
    }

    @Override
    public ListOrderOutput filterOrder(PagingInput paging, String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Order> products = findAllOrderByUserIDUseCase.filterOrder(userID, timeSearch, sortType, sortValue, searchType, searchValue);
        int totalItem = products.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<OrderOutput> orderOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(order -> {
                OrderOutput orderOutput = OrderMapperInput.toDTO(order);

                //get category of products
                List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByOrderIDUseCase.findAllOrderLineItemByOrderID(order.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
                orderOutput.setOrderLineItems(orderLineItemOutputs);

                //get image of products
                List<OrderTableOutput> tableOutputs = findAllOrderTableByOrderIDUseCase.findAllOrderTableByOrderID(order.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
                orderOutput.setTables(tableOutputs);
                return orderOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListOrderOutput.builder()
                    .orders(orderOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListOrderOutput.builder()
                    .orders(products.stream().map(order -> {
                        OrderOutput orderOutput = OrderMapperInput.toDTO(order);

                        //get category of products
                        List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByOrderIDUseCase.findAllOrderLineItemByOrderID(order.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
                        orderOutput.setOrderLineItems(orderLineItemOutputs);

                        //get image of products
                        List<OrderTableOutput> tableOutputs = findAllOrderTableByOrderIDUseCase.findAllOrderTableByOrderID(order.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
                        orderOutput.setTables(tableOutputs);
                        return orderOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(products.size())
                    .build();
        }
    }

    @Override
    public List<OrderOutput> findAllOrder() {
        return  findAllOrderUseCase.findAllOrder().stream().map(order -> {
            OrderOutput orderOutput = OrderMapperInput.toDTO(order);

            //get category of products
            List<OrderLineItemOutput> orderLineItemOutputs = findAllOrderLineItemByOrderIDUseCase.findAllOrderLineItemByOrderID(order.getId()).stream().map(OrderLineItemMapperInput::toDTO).toList();
            orderOutput.setOrderLineItems(orderLineItemOutputs);

            //get image of products
            List<OrderTableOutput> tableOutputs = findAllOrderTableByOrderIDUseCase.findAllOrderTableByOrderID(order.getId()).stream().map(OrderTableMapperInput::toDTO).toList();
            orderOutput.setTables(tableOutputs);
            return orderOutput;
        }).toList();
    }

    @Override
    public OrderOutput findOrderByID(String orderID) {
        OrderOutput orderOutput = OrderMapperInput.toDTO(findOrderByIDUseCase.findOrderByID(orderID));
        orderOutput.setTables(findAllOrderTableByOrderIDUseCase.findAllOrderTableByOrderID(orderID).stream().map(OrderTableMapperInput::toDTO).toList());
        orderOutput.setOrderLineItems(findAllOrderLineItemByOrderIDUseCase.findAllOrderLineItemByOrderID(orderID).stream().map(OrderLineItemMapperInput::toDTO).toList());
        return orderOutput;
    }
}
