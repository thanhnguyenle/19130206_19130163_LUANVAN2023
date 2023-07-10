package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IWriteOrderTablePort {
    OrderTable updateOrderTable(String orderID,String tableID, OrderTable orderTable);
}
