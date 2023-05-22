package fitnlu.ntpos.orderservice.application.services.orderLineItem;

import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IDeleteOrderLineItemUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IFindAllOrderLineItemByOrderIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderLineItem;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public class FindOrderLineItemService implements IFindAllOrderLineItemByOrderIDUseCase {

    @Override
    public List<OrderLineItem> findAllOrderLineItemByOrderID(String orderID) {
        return null;
    }

    @Override
    public List<OrderLineItem> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public List<OrderLineItem> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }
}
