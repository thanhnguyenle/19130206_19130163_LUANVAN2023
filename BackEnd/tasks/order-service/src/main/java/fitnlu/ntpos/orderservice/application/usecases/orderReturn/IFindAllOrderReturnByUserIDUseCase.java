package fitnlu.ntpos.orderservice.application.usecases.orderReturn;

import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllOrderReturnByUserIDUseCase {
   List<OrderReturn> findAllOrderReturn();
   List<OrderReturn> findAllOrderReturn(IPaging paging,TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderReturn> findAllOrderReturn(TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue);
}
