package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderReturnEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindReturnOrderEndpointPort {
    List<OrderReturnOutput> findAllOrderReturn();
    ListReturnOrderOutput findAllOrderReturn(PagingInput pagingInput,TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue);
    OrderReturnOutput findOrderReturn(String id);
    List<OrderTableOutput> findAllOrderTableByReturnOrderID(String returnOrderID);
    List<OrderLineItemOutput> findAllOrderLineItemByReturnOrderID(String returnOrderID) ;
    List<OrderReturnOutput> findAllOrderReturnByOrderID(String orderID) ;

    List<OrderReturnOutput> findAllOrderReturnByUserID(String userID) ;
}
