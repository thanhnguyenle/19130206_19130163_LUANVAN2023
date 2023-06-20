package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.OrderTableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.IOrderTableDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IReadOrderTablePort;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadOrderTableAdapter implements IReadOrderTablePort {
    private final IOrderTableDBIRepository orderTableDBIRepository;

    @Override
    public List<OrderTable> findAllOrderTableByOrderID(String orderID) {
        return orderTableDBIRepository.findAllOrderTableByOrderID(orderID).stream().map(OrderTableMapperOutput::toDomain).toList();
    }

    @Override
    public List<OrderTable> findAllOrderTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return orderTableDBIRepository.findAllOrderTableByOrderID(paging, orderID, sortType, sortValue, searchType, searchValue).stream().map(OrderTableMapperOutput::toDomain).toList();
    }

    @Override
    public List<OrderTable> findAllOrderTableByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return orderTableDBIRepository.findAllOrderTableByOrderID(orderID, sortType, sortValue, searchType, searchValue).stream().map(OrderTableMapperOutput::toDomain).toList();
    }

    @Override
    public OrderTable findOrderTableByID(String orderID, String tableID) {
        return OrderTableMapperOutput.toDomain(orderTableDBIRepository.findOrderTableByID(orderID, tableID));
    }

    @Override
    public List<OrderTable> findAllOrderTable() {
        return orderTableDBIRepository.findAllOrderTable().stream().map(OrderTableMapperOutput::toDomain).toList();
    }
}
