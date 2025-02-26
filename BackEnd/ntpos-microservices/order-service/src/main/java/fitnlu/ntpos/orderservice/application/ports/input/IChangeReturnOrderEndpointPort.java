package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderProductEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderTableEntities;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteReturnOrderPort;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public interface IChangeReturnOrderEndpointPort {
    OrderReturnOutput createOrderReturn(OrderReturnInput orderReturnInput);
    OrderReturnOutput deleteOrderReturn(String id);
    OrderReturnOutput updateOrderReturn(String id, OrderReturnInput orderReturnInput);
    ResultOutput addOrderLineItemToReturnOrder(String orderID, List<OrderLineItemInput> orderLineItemInputs) ;
    ResultOutput addTableToReturnOrder(String orderID, List<OrderTableInput> orderTableInputs) ;
    ResultOutput deleteAllOrderItemFromReturnOrder(String orderItemID);
    ResultOutput deleteAllTableFromReturnOrder(String tableID);
}
