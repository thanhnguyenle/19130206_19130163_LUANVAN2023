package fitnlu.ntpos.orderservice.application.usecases.order;

import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderByUserIDUseCase {
    List<Order> findAllOrderByUserID(String userID);
    List<Order> filterOrder(IPaging paging, String userID, TimeSearch timeSearch,String sortType, String sortValue, String searchType, String searchValue) ;
    List<Order> filterOrder(String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) ;
}
