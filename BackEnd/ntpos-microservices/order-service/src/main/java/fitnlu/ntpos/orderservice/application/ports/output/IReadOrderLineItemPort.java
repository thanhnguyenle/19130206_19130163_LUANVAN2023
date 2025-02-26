package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.grpcproto.TimeSearch;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadOrderLineItemPort {
     List<OrderProduct> findAllOrderLineItemByOrderID(String orderID) ;
     List<OrderProduct> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) ;
     List<OrderProduct> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) ;
     OrderProduct findOrderLineItemByID(String id);

     List<OrderProduct> findAllOrderLineItemByProductID(String productID);

     int numberOfOrderProductComplete();
     int numberOfOrderProductComplete(TimeSearch timeSearch);
     List<OrderProduct> findAllOrderLineItemByProductID(String productID, TimeSearch timeSearch);
}
