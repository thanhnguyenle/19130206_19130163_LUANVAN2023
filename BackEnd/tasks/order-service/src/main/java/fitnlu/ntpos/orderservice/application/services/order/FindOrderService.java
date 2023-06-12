package fitnlu.ntpos.orderservice.application.services.order;

import fitnlu.ntpos.orderservice.application.ports.output.IReadOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderByUserIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindOrderByIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindOrderService implements IFindAllOrderByUserIDUseCase, IFindAllOrderUseCase, IFindOrderByIDUseCase {
    private final IReadOrderPort readOrderPort;
    @Override
    public List<Order> findAllOrderByUserID(String userID) {
        return readOrderPort.findAllOrderByUserID(userID);
    }

    @Override
    public List<Order> filterOrder(IPaging paging, String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderPort.filterOrder(paging,userID,timeSearch,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Order> filterOrder(String userID,TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderPort.filterOrder(userID,timeSearch,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Order> findAllOrder() {
        return readOrderPort.findAllOrder();
    }

    @Override
    public Order findOrderByID(String orderID) {
        return readOrderPort.findOrderByID(orderID);
    }
}
