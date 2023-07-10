package fitnlu.ntpos.orderservice.application.services.orderReturn;

import fitnlu.ntpos.orderservice.application.ports.output.IReadReturnOrderPort;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.*;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FindOrderReturnService implements IFindOrderReturnUseCase,
        IFindAllOrderReturnUseCase, IFindAllOrderTableByReturnOrderIDUseCase,
        IFindAllOrderLineItemByReturnOrderIDUseCase, IFindAllOrderReturnByOrderIDUseCase,
    IFindAllOrderReturnByUserIDUseCase {
    private final IReadReturnOrderPort readOrderReturnPort;
    @Override
    public List<OrderReturn> findAllOrderReturn() {
        return readOrderReturnPort.findAllOrderReturn();
    }

    @Override
    public List<OrderReturn> findAllOrderReturn(IPaging paging, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderReturnPort.findAllOrderReturn(paging,timeSearch, sortType, sortValue, searchType, searchValue);
    }

    @Override
    public List<OrderReturn> findAllOrderReturn(TimeSearch timeSearch,String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderReturnPort.findAllOrderReturn(timeSearch,sortType, sortValue, searchType, searchValue);
    }

    @Override
    public OrderReturn findOrderReturn(String id) {
        return readOrderReturnPort.findOrderReturn(id);
    }

    @Override
    public List<OrderTable> findAllOrderTableByReturnOrderID(String returnOrderID) {
        return readOrderReturnPort.findAllOrderTableByReturnOrderID(returnOrderID);
    }

    @Override
    public List<OrderProduct> findAllOrderLineItemByReturnOrderID(String returnOrderID) {
        return readOrderReturnPort.findAllOrderLineItemByReturnOrderID(returnOrderID);
    }

    @Override
    public List<OrderReturn> findAllOrderReturnByOrderID(String orderID) {
        return readOrderReturnPort.findAllOrderReturnByOrderID(orderID);
    }

    @Override
    public List<OrderReturn> findAllOrderReturnByUserID(String userID) {
        return readOrderReturnPort.findAllOrderReturnByUserID(userID);
    }
}
