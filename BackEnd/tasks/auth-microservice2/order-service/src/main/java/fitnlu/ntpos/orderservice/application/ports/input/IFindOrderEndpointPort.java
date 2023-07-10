package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.ListOrderOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.OrderOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindOrderEndpointPort {
    List<OrderOutput> findAllOrderByUserID(String userID);
    ListOrderOutput filterOrder(PagingInput paging, String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) ;
    List<OrderOutput> findAllOrder();
    OrderOutput findOrderByID(String orderID);
}
