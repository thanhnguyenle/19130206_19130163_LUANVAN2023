package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderProduct;

import java.util.List;

public interface IFindAllOrderTableByReturnOrderIDUseCase {
    List<OrderProduct> findAllOrderLineItemByReturnOrderID(String returnOrderID);
}
