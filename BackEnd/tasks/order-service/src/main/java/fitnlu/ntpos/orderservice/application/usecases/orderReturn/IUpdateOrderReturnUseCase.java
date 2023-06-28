package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public interface IUpdateOrderReturnUseCase {
    OrderReturn updateOrderReturn(String id, OrderReturn orderReturn);
    boolean addOrderLineItemToReturnOrder(String orderID, List<OrderProduct> orderProducts) ;
    boolean addTableToReturnOrder(String orderID, List<OrderTable> orderTables) ;
    boolean deleteAllOrderItemFromReturnOrder(String orderItemID);
    boolean deleteAllTableFromReturnOrder(String tableID);
}
