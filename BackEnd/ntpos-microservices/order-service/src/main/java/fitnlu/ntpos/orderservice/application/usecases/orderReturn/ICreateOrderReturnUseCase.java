package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderReturn;

public interface ICreateOrderReturnUseCase {
    OrderReturn createOrderReturn(OrderReturn orderReturn);
}
