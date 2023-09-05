package fitnlu.ntpos.orderservice.application.usecases.orderLineItem;

import fitnlu.ntpos.grpcproto.TimeSearch;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderLineItemByOrderIDUseCase {
    List<OrderProduct> findAllOrderLineItemByOrderID(String orderID);
    List<OrderProduct> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderProduct> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue);

    List<OrderProduct> findAllOrderLineItemByProductID(String productID);
    List<OrderProduct> findAllOrderLineItemByProductID(String productID, TimeSearch timeSearch);
    int numberOfOrderProductComplete();
    int numberOfOrderProductComplete(TimeSearch timeSearch);
}
