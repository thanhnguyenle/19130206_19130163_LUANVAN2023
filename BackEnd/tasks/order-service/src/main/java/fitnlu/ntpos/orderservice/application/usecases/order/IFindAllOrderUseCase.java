package fitnlu.ntpos.orderservice.application.usecases.order;

import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderUseCase {
    List<Order> findAllOrder();

}
