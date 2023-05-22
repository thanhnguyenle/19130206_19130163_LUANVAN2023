package fitnlu.ntpos.orderservice.application.usecases;

import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderByUserIDUseCase {
    List<Order> findAllOrderByUserID(String userID);
    List<Order> filterOrder(IPaging paging, String userID, String sortType, String sortValue, String searchType, String searchValue) ;
}
