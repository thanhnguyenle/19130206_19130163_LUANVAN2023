package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.grpcproto.TimeSearch;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.Collection;
import java.util.List;

public interface IOrderLineItemDBIRepository {

    OrderProductEntities updateOrderLineItem(String orderID, String productID,  OrderProductEntities orderProductEntities);
    List<OrderProductEntities> findAllOrderLineItemByOrderID(String orderID) ;
    List<OrderProductEntities> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) ;
    List<OrderProductEntities> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) ;
    OrderProductEntities findOrderLineItemByID(String id);
    boolean deleteAllOrderLineItemsFromOrder(String orderID);

    List<OrderProductEntities> findAllOrderLineItemByProductID(String productID);
    List<OrderProductEntities> findAllOrderLineItemByProductID(String productID, TimeSearch timeSearch);
    int numberOfOrderProductComplete();
    int numberOfOrderProductComplete(TimeSearch timeSearch);
}
