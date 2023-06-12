package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.application.ports.output.IReadOrderLineItemPort;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadOrderLineItemAdapter implements IReadOrderLineItemPort {
    private final IReadOrderLineItemPort iReadOrderLineItemPort;
    @Override
    public List<OrderProduct> findAllOrderLineItemByOrderID(String orderID) {
        return iReadOrderLineItemPort.findAllOrderLineItemByOrderID(orderID);
    }

    @Override
    public List<OrderProduct> filterAllOrderLineItemByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return iReadOrderLineItemPort.filterAllOrderLineItemByOrderID(paging,orderID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<OrderProduct> filterAllOrderLineItemByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return iReadOrderLineItemPort.filterAllOrderLineItemByOrderID(orderID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public OrderProduct findOrderLineItemByID(String id) {
        return iReadOrderLineItemPort.findOrderLineItemByID(id);
    }
}
