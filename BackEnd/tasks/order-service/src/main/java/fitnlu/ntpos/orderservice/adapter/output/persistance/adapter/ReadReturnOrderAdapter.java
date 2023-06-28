package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IOrderDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IReadOrderPort;
import fitnlu.ntpos.orderservice.domain.model.Order;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadReturnOrderAdapter implements IReadOrderPort {
    private final IOrderDBIRepository iOrderDBIRepository;

    @Override
    public List<Order> findAllOrderByUserID(String userID) {
        return iOrderDBIRepository.findAllOrderByUserID(userID).stream().map(OrderMapperOutput::toDomain).toList();
    }

    @Override
    public List<Order> filterOrder(IPaging paging, String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        return iOrderDBIRepository.filterOrder(paging,userID,timeSearch,sortType,sortValue,searchType,searchValue).stream().map(OrderMapperOutput::toDomain).toList();
    }

    @Override
    public List<Order> filterOrder(String userID, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        return iOrderDBIRepository.filterOrder(userID,timeSearch,sortType,sortValue,searchType,searchValue).stream().map(OrderMapperOutput::toDomain).toList();
    }

    @Override
    public List<Order> findAllOrder() {
        return iOrderDBIRepository.findAllOrder().stream().map(OrderMapperOutput::toDomain).toList();
    }

    @Override
    public Order findOrderByID(String orderID) {
        return OrderMapperOutput.toDomain(iOrderDBIRepository.findOrderByID(orderID));
    }
}
