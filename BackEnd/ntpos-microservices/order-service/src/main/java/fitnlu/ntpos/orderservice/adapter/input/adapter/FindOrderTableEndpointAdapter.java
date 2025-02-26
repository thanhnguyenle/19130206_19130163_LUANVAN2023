package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.OrderTableController;
import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.input.mapper.GroupTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.TableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IFindOrderTableEndpointPort;
import fitnlu.ntpos.orderservice.application.ports.input.IFindTableEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindAllGroupTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindAllOrderTableByOrderIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindAllOrderTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindOrderTableByIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindOrderTableByTableIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.*;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.orderservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindOrderTableEndpointAdapter implements IFindOrderTableEndpointPort {
    private final IFindAllOrderTableByOrderIDUseCase findAllOrderTableByOrderIDUseCase;
    private final IFindOrderTableByIDUseCase findOrderTableByIDUseCase;
    private final IFindAllOrderTableUseCase findAllOrderTableUseCase;
    private final IFindOrderTableByTableIDUseCase findOrderTableByTableIDUseCase;
    @Override
    public ListOrderTablesOutput findAllOrderTableByOrderID(String orderID) {
        List<OrderTableOutput> orderTableOutputs = findAllOrderTableByOrderIDUseCase.findAllOrderTableByOrderID(orderID).stream().map(OrderTableMapperInput::toDTO).toList();
        return ListOrderTablesOutput.builder()
                .orderTableOutputs(orderTableOutputs)
                .totalPage(1)
                .totalItem(orderTableOutputs.size())
                .currentPage(1)
                .build();
      }

    @Override
    public ListOrderTablesOutput findAllOrderTableByOrderID(PagingInput pagingInput, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<OrderTable> orderTables = findAllOrderTableByOrderIDUseCase.findAllOrderTableByOrderID(orderID ,sortType, sortValue, searchType, searchValue);
        int totalItem = orderTables.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<OrderTableOutput> orderTableOutputs = orderTables.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(OrderTableMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListOrderTablesOutput.builder()
                    .orderTableOutputs(orderTableOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }else {
            List<OrderTableOutput> orderTableOutputs = orderTables.stream().map(OrderTableMapperInput::toDTO).toList();
            return ListOrderTablesOutput.builder()
                    .orderTableOutputs(orderTableOutputs)
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(totalItem)
                    .build();
        }
    }

    @Override
    public OrderTableOutput findOrderTableByID(String orderID, String tableID) {
        return OrderTableMapperInput.toDTO(findOrderTableByIDUseCase.findOrderTableByID(orderID, tableID));
    }

    @Override
    public ListOrderTablesOutput findAllOrderTable() {
        List<OrderTableOutput> orderTableOutputs = findAllOrderTableUseCase.findAllOrderTable().stream().map(OrderTableMapperInput::toDTO).toList();
        return ListOrderTablesOutput.builder()
                .orderTableOutputs(orderTableOutputs)
                .totalPage(1)
                .totalItem(orderTableOutputs.size())
                .currentPage(1)
                .build();
    }

    @Override
    public ListOrderTablesOutput findOrderTableByTableID(String tableID) {
        return ListOrderTablesOutput.builder()
                .orderTableOutputs(findOrderTableByTableIDUseCase.findOrderTableByTableID(tableID).stream().map(OrderTableMapperInput::toDTO).toList())
                .totalPage(1)
                .totalItem(findOrderTableByTableIDUseCase.findOrderTableByTableID(tableID).size())
                .currentPage(1)
                .build();
    }
}
