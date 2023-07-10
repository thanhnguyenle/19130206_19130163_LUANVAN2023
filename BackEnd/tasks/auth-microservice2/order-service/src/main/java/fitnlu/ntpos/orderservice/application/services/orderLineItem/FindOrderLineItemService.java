package fitnlu.ntpos.orderservice.application.services.orderLineItem;

import fitnlu.ntpos.orderservice.application.ports.output.IReadOrderLineItemPort;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IFindAllOrderLineItemByOrderIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IFindOrderLineItemByIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindOrderLineItemService implements IFindAllOrderLineItemByOrderIDUseCase, IFindOrderLineItemByIDUseCase {
    private final IReadOrderLineItemPort readOrderLineItemPort;
    @Override
    public List<OrderProduct> findAllOrderLineItemByOrderID(String orderID) {
        return readOrderLineItemPort.findAllOrderLineItemByOrderID(orderID);
    }

    @Override
    public List<OrderProduct> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderLineItemPort.filterAllOrderLineItemByOrderID(paging,orderID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<OrderProduct> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderLineItemPort.filterAllOrderLineItemByOrderID(orderID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public OrderProduct findOrderLineItemByID(String id) {
        return readOrderLineItemPort.findOrderLineItemByID(id);
    }
}
