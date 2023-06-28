package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderReturnMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IReturnOrderDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IReadReturnOrderPort;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import fitnlu.ntpos.orderservice.domain.model.OrderReturn;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.domain.model.TimeSearch;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadReturnOrderAdapter implements IReadReturnOrderPort {
    private final IReturnOrderDBIRepository returnOrderDBIRepository;
    @Override
    public List<OrderReturn> findAllOrderReturn() {
        return returnOrderDBIRepository.findAllOrderReturn().stream().map(OrderReturnMapperOutput::toDomain).toList();
    }

    @Override
    public List<OrderReturn> findAllOrderReturn(IPaging paging, TimeSearch timeSearch, String sortType, String sortValue, String searchType, String searchValue) {
        return returnOrderDBIRepository.findAllOrderReturn(paging, timeSearch,sortType, sortValue, searchType, searchValue).stream().map(OrderReturnMapperOutput::toDomain).toList();
    }

    @Override
    public List<OrderReturn> findAllOrderReturn(TimeSearch timeSearch,String sortType, String sortValue, String searchType, String searchValue) {
        return returnOrderDBIRepository.findAllOrderReturn(timeSearch,sortType, sortValue, searchType, searchValue).stream().map(OrderReturnMapperOutput::toDomain).toList();
    }

    @Override
    public OrderReturn findOrderReturn(String id) {
        return OrderReturnMapperOutput.toDomain(returnOrderDBIRepository.findOrderReturn(id));
    }

    @Override
    public List<OrderTable> findAllOrderTableByReturnOrderID(String returnOrderID) {
        return returnOrderDBIRepository.findAllOrderTableByReturnOrderID(returnOrderID).stream().map(OrderReturnMapperOutput::toDomain).toList();
    }

    @Override
    public List<OrderProduct> findAllOrderLineItemByReturnOrderID(String returnOrderID) {
        return returnOrderDBIRepository.findAllOrderLineItemByReturnOrderID(returnOrderID).stream().map(OrderReturnMapperOutput::toDomain).toList();
    }

    @Override
    public List<OrderReturn> findAllOrderReturnByOrderID(String orderID) {
        return returnOrderDBIRepository.findAllOrderReturnByOrderID(orderID).stream().map(OrderReturnMapperOutput::toDomain).toList();
    }

    @Override
    public List<OrderReturn> findAllOrderReturnByUserID(String userID) {
        return returnOrderDBIRepository.findAllOrderReturnByUserID(userID).stream().map(OrderReturnMapperOutput::toDomain).toList();
    }
}
