package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderReturn;

public interface IDeleteOrderReturnUseCase {
    OrderReturn updateOrderReturn(String id, OrderReturn orderReturn);
}
