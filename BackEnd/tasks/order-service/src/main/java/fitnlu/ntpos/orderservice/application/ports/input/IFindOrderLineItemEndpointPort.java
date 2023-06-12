package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.ListOrderLineItemsOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderLineItemOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;
public interface IFindOrderLineItemEndpointPort {
    ListOrderLineItemsOutput findAllOrderLineItemByOrderID(String orderID) ;
    ListOrderLineItemsOutput filterAllOrderLineItemByOrderID(PagingInput pagingInput, String orderID, String sortType, String sortValue, String searchType, String searchValue) ;
    OrderLineItemOutput findOrderLineItemByID(String id);
}
