package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.ListTableOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.GroupTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.TableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IFindTableEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IFindAllGroupTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.*;
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
    private final IFindTableByIDUseCase findTableByIDUseCase;
    private final IFindAllGroupTableUseCase findAllGroupTableUseCase;
    private final IFindAllTableByGroupIDUseCase findAllTableByGroupIDUseCase;
    private final IFindAllEmptyTableUseCase findAllEmptyTableUseCase;
    private final IFindAllBusyTableUseCase findAllBusyTableUseCase;
    private final IFindTableNotInGroup findTableNotInGroup;

    @Override
    public ListTableOutput findAllTable() {
        List<TableOutput> tableOutputs = findAllTableUseCase.findAllTable().stream().map(table -> {
            TableOutput tableOutput = TableMapperInput.toDTO(table);
            List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
            tableOutput.setGroups(groupTable);
            return tableOutput;
        }).toList();
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
            List<TableOutput> productOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(table->{
                TableOutput tableOutput = TableMapperInput.toDTO(table);
                List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                tableOutput.setGroups(groupTable);
                return tableOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListTableOutput.builder()
                    .tables(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListTableOutput.builder()
                    .tables(products.stream().map(table -> {
                        TableOutput tableOutput = TableMapperInput.toDTO(table);
                        List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                        tableOutput.setGroups(groupTable);
                        return tableOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(products.size())
                    .build();
        }
    }

    @Override
    public ListTableOutput findEmptyTableAtTime(long startTime, long endTime) {
        List<TableOutput> tableOutputs = findEmptyTableAtTimeUseCase.findEmptyTableAtTime(startTime, endTime).stream().map(
                table -> {
                    TableOutput tableOutput = TableMapperInput.toDTO(table);
                    List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                    tableOutput.setGroups(groupTable);
                    return tableOutput;
                }
        ).toList();
        return ListTableOutput.builder()
                .tables(tableOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tableOutputs.size())
                .build();
    }

    @Override
    public ListTableOutput findEmptyTableAtTime(PagingInput paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Table> tableOutputs = findEmptyTableAtTimeUseCase.findEmptyTableAtTime(startTime, endTime);
        int totalItem = tableOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<TableOutput> productOutputs = tableOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(table -> {
                TableOutput tableOutput = TableMapperInput.toDTO(table);
                List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                tableOutput.setGroups(groupTable);
                return tableOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListTableOutput.builder()
                    .tables(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListTableOutput.builder()
                    .tables(tableOutputs.stream().map(table -> {
                        TableOutput tableOutput = TableMapperInput.toDTO(table);
                        List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                        tableOutput.setGroups(groupTable);
                        return tableOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(tableOutputs.size())
                    .build();
        }
    }

    @Override
    public ListTableOutput findBusyTableAtTime(long startTime, long endTime) {
        List<TableOutput> tableOutputs = findBusyTableAtTimeUseCase.findBusyTableAtTime(startTime, endTime).stream().map(table -> {
            TableOutput tableOutput = TableMapperInput.toDTO(table);
            List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
            tableOutput.setGroups(groupTable);
            return tableOutput;
        }).toList();
        return ListTableOutput.builder()
                .tables(tableOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tableOutputs.size())
                .build();
    }

    @Override
    public ListTableOutput findBusyTableAtTime(PagingInput paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Table> tableOutputs = findBusyTableAtTimeUseCase.findBusyTableAtTime(startTime, endTime);
        int totalItem = tableOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<TableOutput> productOutputs = tableOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(table -> {
                TableOutput tableOutput = TableMapperInput.toDTO(table);
                List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                tableOutput.setGroups(groupTable);
                return tableOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListTableOutput.builder()
                    .tables(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListTableOutput.builder()
                    .tables(tableOutputs.stream().map(table -> {
                        TableOutput tableOutput = TableMapperInput.toDTO(table);
                        List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                        tableOutput.setGroups(groupTable);
                        return tableOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(tableOutputs.size())
                    .build();
        }
    }

    @Override
    public TableOutput findTableByID(String tableID) {
        TableOutput tableOutput = TableMapperInput.toDTO(findTableByIDUseCase.findTableByID(tableID));
        tableOutput.setGroups(findAllGroupTableUseCase.findAllGroupTableByTableID(tableID).stream().map(GroupTableMapperInput::toDTO).toList());
        return tableOutput;
    }

    @Override
    public ListTableOutput findAllTableByOrderID(String orderID) {
        List<TableOutput> tableOutputs = findAllTableByOrderIDUseCase.findAllTableByOrderID(orderID).stream().map(table -> {
            TableOutput tableOutput = TableMapperInput.toDTO(table);
            List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
            tableOutput.setGroups(groupTable);
            return tableOutput;
        }).toList();
        return ListTableOutput.builder()
                .tables(tableOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tableOutputs.size())
                .build();
    }

    @Override
    public ListTableOutput findAllTableByGroupID(String groupID) {
        List<TableOutput> re =  findAllTableByGroupIDUseCase.findAllTableByGroupID(groupID).stream().map(table -> {
            TableOutput tableOutput = TableMapperInput.toDTO(table);
            List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
            tableOutput.setGroups(groupTable);
            return tableOutput;
        }).toList();
        return ListTableOutput.builder()
                .tables(re)
                .currentPage(1)
                .totalPage(1)
                .totalItem(re.size())
                .build();
    }

    @Override
    public ListTableOutput findAllTableByOrderID(PagingInput paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        List<Table> tableOutputs = findAllTableByOrderIDUseCase.findAllTableByOrderID(orderID);
        int totalItem = tableOutputs.size();
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        if (ipaging != null && ipaging.getPage() != null) {
            List<TableOutput> productOutputs = tableOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(table -> {
                TableOutput tableOutput = TableMapperInput.toDTO(table);
                List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                tableOutput.setGroups(groupTable);
                return tableOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListTableOutput.builder()
                    .tables(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListTableOutput.builder()
                    .tables(tableOutputs.stream().map(table -> {
                        TableOutput tableOutput = TableMapperInput.toDTO(table);
                        List<GroupOutput> groupTable = findAllGroupTableUseCase.findAllGroupTableByTableID(table.getId()).stream().map(GroupTableMapperInput::toDTO).toList();
                        tableOutput.setGroups(groupTable);
                        return tableOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(tableOutputs.size())
                    .build();
        }
    }

    @Override
    public ListTableOutput findAllTableBusy() {
        List<TableOutput> tables = findAllBusyTableUseCase.findAllBusyTable().stream().map(TableMapperInput::toDTO).toList();
        return ListTableOutput.builder()
                .tables(tables)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tables.size())
                .build();
    }

    @Override
    public ListTableOutput findAllTableEmpty() {
        List<TableOutput> tables = findAllEmptyTableUseCase.findAllEmptyTable().stream().map(TableMapperInput::toDTO).toList();
        return ListTableOutput.builder()
                .tables(tables)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tables.size())
                .build();
    }

    @Override
    public ListTableOutput findAllTableNotInGroup() {
        List<TableOutput> tables =  findTableNotInGroup.findTableNotInGroup().stream().map(TableMapperInput::toDTO).toList() ;
        return ListTableOutput.builder()
                .tables(tables)
                .currentPage(1)
                .totalPage(1)
                .totalItem(tables.size())
                .build();
    }
}
