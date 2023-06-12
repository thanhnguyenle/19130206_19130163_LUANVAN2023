package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindOrderLineItemByIDUseCase {
    List<OrderLineItem> findAllOrderLineItemByOrderID(String orderID);
    List<OrderLineItem> filterAllOrderLineItemByOrderID(IPaging paging,String orderID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderLineItem> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue);
}
