package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.ChangeReturnOrderEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.adapter.FindReturnOrderEndpointAdapter;
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
public class OrderReturnController {
    private final ChangeReturnOrderEndpointAdapter changeReturnOrderEndpointAdapter;
    private final FindReturnOrderEndpointAdapter findReturnOrderEndpointAdapter;

    //Query
    @QueryMapping("ordersReturn")
    public List<OrderReturnOutput> ordersReturn() {
        return findReturnOrderEndpointAdapter.findAllOrderReturn();
    }
    @QueryMapping("orderReturn")
    public OrderReturnOutput orderReturn(@Argument String id) {
        return findReturnOrderEndpointAdapter.findOrderReturn(id);
    }
    @QueryMapping("filterOrdersReturn")
    public ListReturnOrderOutput filterOrdersReturn(@Argument PagingInput pagingInput, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue) {
        return findReturnOrderEndpointAdapter.findAllOrderReturn(pagingInput,timeSearch, sortType, sortValue,searchType, searchValue);
    }
    @QueryMapping("findAllOrderReturnByOrderID")
    public List<OrderReturnOutput> findAllOrderReturnByOrderID(@Argument String orderID){
        return findReturnOrderEndpointAdapter.findAllOrderReturnByOrderID(orderID);
    }
    @QueryMapping("findAllOrderReturnByUserID")
    public List<OrderReturnOutput> findAllOrderReturnByUserID(@Argument String userID){
        return findReturnOrderEndpointAdapter.findAllOrderReturnByUserID(userID);
    }
    //Mutation
    @MutationMapping("createOrderReturn")
    public OrderReturnOutput createOrderReturn(@Argument OrderReturnInput orderReturnInput) {
        return changeReturnOrderEndpointAdapter.createOrderReturn(orderReturnInput);
    }
    @MutationMapping("updateOrderReturn")
    public OrderReturnOutput updateOrderReturn(@Argument String id, @Argument OrderReturnInput orderReturnInput) {
        return changeReturnOrderEndpointAdapter.updateOrderReturn(id,orderReturnInput);
    }
    @MutationMapping("deleteOrderReturn")
    public OrderReturnOutput deleteOrderReturn(@Argument String id) {
        return changeReturnOrderEndpointAdapter.deleteOrderReturn(id);
    }
}
