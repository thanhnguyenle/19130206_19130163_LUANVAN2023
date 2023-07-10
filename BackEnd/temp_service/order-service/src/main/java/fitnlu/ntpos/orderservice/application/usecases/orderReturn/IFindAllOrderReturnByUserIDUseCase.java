package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderReturnByUserIDUseCase {
   List<OrderReturn> findAllOrderReturnByUserID(String userID);
}
