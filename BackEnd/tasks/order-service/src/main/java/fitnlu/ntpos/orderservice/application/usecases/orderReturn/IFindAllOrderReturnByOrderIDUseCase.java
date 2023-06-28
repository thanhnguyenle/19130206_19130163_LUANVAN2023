package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderReturn;

import java.util.List;

public interface IFindAllOrderReturnByOrderIDUseCase {
   List<OrderReturn> findAllOrderReturnByUserID();
}
