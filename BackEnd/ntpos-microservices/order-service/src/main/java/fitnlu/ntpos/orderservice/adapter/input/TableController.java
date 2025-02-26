package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.ChangeTableEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.adapter.FindTableEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TableController {
    private final ChangeTableEndpointAdapter changeTableEndpointAdapter;
    private final FindTableEndpointAdapter findTableEndpointAdapter;

    //Query
    @QueryMapping("findTableByID")
    public TableOutput findTableByID(@Argument String id) {
        return findTableEndpointAdapter.findTableByID(id);
    }
    @QueryMapping("filterTables")
    public ListTableOutput filterTables(@Argument PagingInput pagingInput, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findTableEndpointAdapter.findAllTable(pagingInput,sortType,sortValue,searchType,searchValue);
    }
    @QueryMapping("findAllTables")
    public ListTableOutput findAllTables() {
        return findTableEndpointAdapter.findAllTable();
    }
    @QueryMapping("filterTablesByGroupID")
    public ListTableOutput filterTablesByGroupID(@Argument PagingInput pagingInput, @Argument String groupID, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findTableEndpointAdapter.findAllTableByOrderID(pagingInput,groupID,sortType,sortValue,searchType,searchValue);
    }
    @QueryMapping("filterBusyTables")
    public ListTableOutput filterBusyTables(@Argument PagingInput pagingInput, @Argument long startTime,@Argument long endTime, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findTableEndpointAdapter.findBusyTableAtTime(pagingInput,startTime,endTime,sortType,sortValue,searchType,searchValue);
    }
    @QueryMapping("findAllBusyTables")
    public ListTableOutput findAllBusyTable() {
        return findTableEndpointAdapter.findAllTableBusy();
    }
    @QueryMapping("findAllEmptyTables")
    public ListTableOutput findAllEmptyTable() {
        return findTableEndpointAdapter.findAllTableEmpty();
    }
    @QueryMapping("filterEmptyTables")
    public ListTableOutput filterEmptyTables(@Argument PagingInput pagingInput, @Argument long startTime,@Argument long endTime, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findTableEndpointAdapter.findEmptyTableAtTime(pagingInput,startTime,endTime,sortType,sortValue,searchType,searchValue);
    }
    @QueryMapping("findTableNotInGroup")
    public ListTableOutput findTableNotInGroup() {
        return findTableEndpointAdapter.findAllTableNotInGroup();
    }
    //Mutation
    @MutationMapping("createTable")
    public TableOutput createTable(@Argument TableInput tableInput) {
        return changeTableEndpointAdapter.createTable(tableInput);
    }

    @MutationMapping("updateTable")
    public TableOutput updateTable(@Argument String id, @Argument TableInput tableInput) {
        return changeTableEndpointAdapter.updateTable(id,tableInput);
    }
    @MutationMapping("deleteTable")
    public TableOutput deleteTable(@Argument String id) {
        return changeTableEndpointAdapter.deleteTable(id);
    }
}
