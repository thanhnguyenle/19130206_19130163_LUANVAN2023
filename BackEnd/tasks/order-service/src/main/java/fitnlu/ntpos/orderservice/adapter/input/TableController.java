package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.ChangeTableEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.adapter.FindTableEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.dto.ListOrderOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
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
    public OrderOutput findTableByID(@Argument String id) {
        return findOrderEndpointAdapter.findOrderByID(id);
    }
    @QueryMapping("filterTables")
    public ListOrderOutput filterTables(@Argument PagingInput pagingInput, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findTableEndpointAdapter.filterOrder(pagingInput,timeSearch, searchType, searchValue, sortType, sortValue);
    }
    @QueryMapping("findAllTables")
    public List<OrderOutput> findAllTables(@Argument String userID) {
        return findOrderEndpointAdapter.findAllOrderByUserID(userID);
    }

    //Mutation
}
