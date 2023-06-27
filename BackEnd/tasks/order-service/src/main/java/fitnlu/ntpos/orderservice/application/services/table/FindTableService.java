package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.ports.output.IReadTablePort;
import fitnlu.ntpos.orderservice.application.usecases.table.*;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindTableService implements IFindTableByIDUseCase, IFindEmptyTableAtTimeUseCase, IFindAllTableUseCase, IFindBusyTableAtTimeUseCase , IFindAllTableByOrderIDUseCase {
    private final IReadTablePort readTablePort;
    @Override
    public List<Table> findAllTable() {
        return readTablePort.findAllTable();
    }

    @Override
    public List<Table> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findAllTable(paging,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findAllTable(String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findAllTable(sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findEmptyTableAtTime(String startTime, String endTime) {
        return readTablePort.findEmptyTableAtTime(startTime,endTime);
    }

    @Override
    public List<Table> findEmptyTableAtTime(IPaging paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findEmptyTableAtTime(paging,startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findEmptyTableAtTime(String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findEmptyTableAtTime(startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public Table findTableByID(String tableID) {
        return readTablePort.findTableByID(tableID);
    }

    @Override
    public List<Table> findBusyTableAtTime(String startTime, String endTime) {
        return readTablePort.findBusyTableAtTime(startTime,endTime);
    }

    @Override
    public List<Table> findBusyTableAtTime(IPaging paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findBusyTableAtTime(paging,startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findBusyTableAtTime(String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findBusyTableAtTime(startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findAllTableByOrderID(String orderID) {
        return null;
    }

    @Override
    public List<Table> findAllTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public List<Table> findAllTableByOrderID(String startTime, String orderID, String sortValue, String searchType, String searchValue) {
        return null;
    }
}
