package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public interface IFindAllOrderTableByReturnOrderIDUseCase {
    List<OrderTable> findAllOrderTableByReturnOrderID(String returnOrderID);
}
