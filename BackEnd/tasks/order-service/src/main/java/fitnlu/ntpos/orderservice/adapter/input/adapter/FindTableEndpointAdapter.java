package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.ListTableOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.GroupTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.TableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IFindTableEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindAllTableByOrderIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindAllTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindBusyTableAtTimeUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindEmptyTableAtTimeUseCase;
import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.orderservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindTableEndpointAdapter implements IFindTableEndpointPort {
    private final IFindAllTableUseCase findAllTableUseCase;
    private final IFindAllTableByOrderIDUseCase findAllTableByOrderIDUseCase;
    private final IFindEmptyTableAtTimeUseCase findEmptyTableAtTimeUseCase;
    private final IFindBusyTableAtTimeUseCase findBusyTableAtTimeUseCase;


    @Override
    public ListTableOutput findAllTable() {
        List<TableOutput> tableOutputs = findAllTableUseCase.findAllTable().stream().map(TableMapperInput::toDTO).toList();
        return ListTableOutput.builder()
                .tables(tableOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tableOutputs.size())
                .build();
    }

    @Override
    public ListTableOutput findAllTable(PagingInput paging, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Table> products = findAllTableUseCase.findAllTable(ipaging, sortType, sortValue, searchType, searchValue);
        int totalItem = products.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<TableOutput> productOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(TableMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListTableOutput.builder()
                    .tables(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListTableOutput.builder()
                    .tables(products.stream().map(TableMapperInput::toDTO).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(products.size())
                    .build();
        }
    }

    @Override
    public ListTableOutput findEmptyTableAtTime(String startTime, String endTime) {
        List<TableOutput> tableOutputs = findEmptyTableAtTimeUseCase.findEmptyTableAtTime(startTime, endTime).stream().map(TableMapperInput::toDTO).toList();
        return ListTableOutput.builder()
                .tables(tableOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tableOutputs.size())
                .build();
    }

    @Override
    public ListTableOutput findEmptyTableAtTime(PagingInput paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Table> tableOutputs = findEmptyTableAtTimeUseCase.findEmptyTableAtTime(startTime, endTime);
        int totalItem = tableOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<TableOutput> productOutputs = tableOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(TableMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListTableOutput.builder()
                    .tables(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListTableOutput.builder()
                    .tables(tableOutputs.stream().map(TableMapperInput::toDTO).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(tableOutputs.size())
                    .build();
        }
    }

    @Override
    public ListTableOutput findBusyTableAtTime(String startTime, String endTime) {
        List<TableOutput> tableOutputs = findBusyTableAtTimeUseCase.findBusyTableAtTime(startTime, endTime).stream().map(TableMapperInput::toDTO).toList();
        return ListTableOutput.builder()
                .tables(tableOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tableOutputs.size())
                .build();
    }

    @Override
    public ListTableOutput findBusyTableAtTime(PagingInput paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Table> tableOutputs = findBusyTableAtTimeUseCase.findBusyTableAtTime(startTime, endTime);
        int totalItem = tableOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<TableOutput> productOutputs = tableOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(TableMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListTableOutput.builder()
                    .tables(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListTableOutput.builder()
                    .tables(tableOutputs.stream().map(TableMapperInput::toDTO).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(tableOutputs.size())
                    .build();
        }
    }

    @Override
    public TableOutput findTableByID(String tableID) {
        return null;
    }

    @Override
    public ListTableOutput findAllTableByOrderID(String orderID) {
        return null;
    }

    @Override
    public ListTableOutput findAllTableByOrderID(PagingInput paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }
}
