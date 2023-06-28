package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderReturn;

public interface IFindAllOrderReturnUseCase {
    OrderReturn updateOrderReturn(String id, OrderReturn orderReturn);
}
