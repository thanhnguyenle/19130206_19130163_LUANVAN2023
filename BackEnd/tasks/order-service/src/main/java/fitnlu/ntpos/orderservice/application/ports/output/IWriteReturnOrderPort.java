package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public interface IWriteReturnOrderPort {
    OrderReturn createOrderReturn(OrderReturn orderReturn);
    OrderReturn deleteOrderReturn(String id);
    OrderReturn updateOrderReturn(String id, OrderReturn orderReturn);
    boolean addOrderLineItemToReturnOrder(String orderID, List<OrderProduct> orderProducts) ;
    boolean addTableToReturnOrder(String orderID, List<OrderTable> orderTables) ;
    boolean deleteAllOrderItemFromReturnOrder(String orderItemID);
    boolean deleteAllTableFromReturnOrder(String tableID);


}
