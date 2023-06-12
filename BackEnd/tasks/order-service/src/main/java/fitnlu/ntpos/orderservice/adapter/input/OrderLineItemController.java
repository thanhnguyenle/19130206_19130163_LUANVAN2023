package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.ChangeOrderLineItemEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.adapter.FindOrderLineItemEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderLineItemController {
    private final ChangeOrderLineItemEndpointAdapter changeOrderLineItemEndpointAdapter;
    private final FindOrderLineItemEndpointAdapter findOrderLineItemEndpointAdapter;

    //Query
    @QueryMapping("findOrderProductByOrderID")
    public ListOrderLineItemsOutput findOrderProductByOrderID(@Argument String orderID) {
        return findOrderLineItemEndpointAdapter.findAllOrderLineItemByOrderID(orderID);
    }

    @QueryMapping("findOrderProductByOrderID")
    public ListOrderLineItemsOutput filterOrderLineItemsByOrderID(@Argument PagingInput pagingInput, @Argument String orderID, @Argument String sortType, @Argument String sortValue, @Argument String searchType, @Argument String searchValue) {
        return findOrderLineItemEndpointAdapter.filterAllOrderLineItemByOrderID(pagingInput, orderID, sortType, sortValue, searchType, searchValue);
    }

    //Mutation
    @MutationMapping("updateOrderLineItem")
    public OrderLineItemOutput updateOrderLineItem(@Argument String orderID, @Argument OrderLineItemInput orderLineItemInput) {
        return changeOrderLineItemEndpointAdapter.updateOrderLineItem(orderID, orderLineItemInput);
    }
}


