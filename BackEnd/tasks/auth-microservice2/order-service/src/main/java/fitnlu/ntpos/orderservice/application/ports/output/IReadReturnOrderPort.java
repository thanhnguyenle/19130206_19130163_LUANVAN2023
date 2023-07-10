package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadReturnOrderPort {
    List<OrderReturn> findAllOrderReturn();
    List<OrderReturn> findAllOrderReturn(IPaging paging, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderReturn> findAllOrderReturn(TimeSearch timeSearch,String sortType, String sortValue, String searchType, String searchValue);
    OrderReturn findOrderReturn(String id);
  List<OrderTable> findAllOrderTableByReturnOrderID(String returnOrderID);
  List<OrderProduct> findAllOrderLineItemByReturnOrderID(String returnOrderID) ;
    List<OrderReturn> findAllOrderReturnByOrderID(String orderID) ;

   List<OrderReturn> findAllOrderReturnByUserID(String userID) ;

}
