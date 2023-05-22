package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadOrderPort {
    List<Order> findAllOrderByUserID(String userID);
    List<Order> filterOrder(IPaging paging, String userID, String sortType, String sortValue, String searchType, String searchValue) ;
    List<Order> filterOrder(String userID, String sortType, String sortValue, String searchType, String searchValue) ;
    List<Order> findAllOrder();
    Order findOrderByID(String orderID);
}
