package fitnlu.ntpos.orderservice.adapter.output.persistance.repository;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.*;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReturnOrderDBIRepository {
    List<OrderReturnEntities> findAllOrderReturn();
    List<OrderReturnEntities> findAllOrderReturn(IPaging paging,TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderReturnEntities> findAllOrderReturn(TimeSearch timeSearch,String sortType, String sortValue, String searchType, String searchValue);
    OrderReturnEntities findOrderReturn(String id);
    OrderReturnEntities createOrderReturn(OrderReturn orderReturn);
    OrderReturnEntities deleteOrderReturn(String id);
    OrderReturnEntities updateOrderReturn(String id, OrderReturn orderReturn);
    boolean addOrderLineItemToReturnOrder(String orderID, List<OrderProductEntities> orderProductEntities) ;
    boolean addTableToReturnOrder(String orderID, List<OrderTableEntities> orderTableEntities) ;
    boolean deleteAllOrderItemFromReturnOrder(String orderItemID);
    boolean deleteAllTableFromReturnOrder(String tableID);
    List<OrderReturnTableEntities> findAllOrderTableByReturnOrderID(String returnOrderID);
    List<OrderReturnProductEntities> findAllOrderLineItemByReturnOrderID(String returnOrderID) ;
    List<OrderReturnEntities> findAllOrderReturnByOrderID(String orderID) ;

    List<OrderReturnEntities> findAllOrderReturnByUserID(String userID) ;
}
