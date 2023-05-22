package fitnlu.ntpos.orderservice.application.services.order;

import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderByUserIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindOrderByIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public class FindOrderService implements IFindAllOrderByUserIDUseCase, IFindAllOrderUseCase, IFindOrderByIDUseCase {
    @Override
    public List<Order> findAllOrderByUserID(String userID) {
        return null;
    }

    @Override
    public List<Order> filterOrder(IPaging paging, String userID, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public List<Order> filterOrder(String userID, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public List<Order> findAllOrder() {
        return null;
    }

    @Override
    public Order findOrderByID(String orderID) {
        return null;
    }
}
