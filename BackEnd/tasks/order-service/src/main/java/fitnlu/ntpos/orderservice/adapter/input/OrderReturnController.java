package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.ChangeOrderEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.adapter.FindOrderEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.dto.ListOrderOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderReturnController {
    private final ChangeOrderEndpointAdapter changeOrderEndpointAdapter;
    private final FindOrderEndpointAdapter findOrderEndpointAdapter;

    //Query
    @QueryMapping("orders")
    public List<OrderOutput> orders() {
        return findOrderEndpointAdapter.findAllOrder();
    }
    @QueryMapping("order")
    public OrderOutput findOrderByID(@Argument String id) {
        return findOrderEndpointAdapter.findOrderByID(id);
    }
    @QueryMapping("findOrdersByUserID")
    public ListOrderOutput findOrdersByUserID(@Argument PagingInput pagingInput, @Argument String userID, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findOrderEndpointAdapter.filterOrder(pagingInput, userID,timeSearch, searchType, searchValue, sortType, sortValue);
    }
    //Mutation
    @MutationMapping("createOrder")
    public OrderOutput createOrder(@Argument OrderInput orderInput) {
        return changeOrderEndpointAdapter.createOrder(orderInput);
    }
    @MutationMapping("updateOrder")
    public OrderOutput updateOrder(@Argument String id, @Argument OrderInput orderInput) {
        return changeOrderEndpointAdapter.updateOrder(id,orderInput);
    }
    @MutationMapping("deleteOrder")
    public OrderOutput deleteOrder(@Argument String id) {
        return changeOrderEndpointAdapter.deleteOrder(id);
    }
}
