package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.ChangeOrderEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.adapter.FindOrderEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {
    private final ChangeOrderEndpointAdapter changeOrderEndpointAdapter;
    private final FindOrderEndpointAdapter findOrderEndpointAdapter;

    //Query
    @QueryMapping("findOrderByID")
    public OrderOutput findOrderByID(@Argument String id) {
        return findOrderEndpointAdapter.findOrderByID(id);
    }
    @QueryMapping("findOrdersByUserID")
    public ListOrderOutput findOrdersByUserID(@Argument PagingInput pagingInput, @Argument String userID, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findOrderEndpointAdapter.filterOrder(pagingInput, userID,timeSearch, searchType, searchValue, sortType, sortValue);
    }
    @QueryMapping("findAllOrderByUserID")
    public List<OrderOutput> findOrdersByUserID( @Argument String userID) {
        return findOrderEndpointAdapter.findAllOrderByUserID(userID);
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
