package fitnlu.ntpos.orderservice.application.services.orderTable;

import fitnlu.ntpos.orderservice.application.ports.output.IReadOrderTablePort;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindAllOrderTableByOrderIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindAllOrderTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindOrderTableByIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderTable.IFindOrderTableByTableIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindOrderTableService implements IFindOrderTableByIDUseCase,
        IFindAllOrderTableByOrderIDUseCase, IFindAllOrderTableUseCase,
        IFindOrderTableByTableIDUseCase{
    private final IReadOrderTablePort readOrderTablePort;
    @Override
    public List<OrderTable> findAllOrderTableByOrderID(String orderID) {
        return readOrderTablePort.findAllOrderTableByOrderID(orderID);
    }

    @Override
    public List<OrderTable> findAllOrderTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderTablePort.findAllOrderTableByOrderID(paging,orderID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<OrderTable> findAllOrderTableByOrderID(String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderTablePort.findAllOrderTableByOrderID(orderID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public OrderTable findOrderTableByID(String orderID, String tableID) {
        return readOrderTablePort.findOrderTableByID(orderID, tableID);
    }

    @Override
    public List<OrderTable> findAllOrderTable() {
        return readOrderTablePort.findAllOrderTable();
    }

    @Override
    public List<OrderTable> findOrderTableByTableID(String tableID) {
        return readOrderTablePort.findAllOrderTableByTableID(tableID);
    }

    @Override
    public List<OrderTable> findOrderTableByTableID(String tableID, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderTablePort.findOrderTableByTableID(tableID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<OrderTable> findOrderTableByTableID(IPaging paging, String tableID, String sortType, String sortValue, String searchType, String searchValue) {
        return readOrderTablePort.findOrderTableByTableID(paging,tableID,sortType,sortValue,searchType,searchValue);
    }
}
