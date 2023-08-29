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
public class FindTableService implements IFindTableByIDUseCase, IFindEmptyTableAtTimeUseCase,
        IFindAllTableUseCase, IFindBusyTableAtTimeUseCase , IFindAllTableByOrderIDUseCase,
    IFindAllTableByGroupIDUseCase, IFindAllBusyTableUseCase, IFindAllEmptyTableUseCase
,IFindTableNotInGroup{
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
    public List<Table> findEmptyTableAtTime(long startTime, long endTime) {
        return readTablePort.findEmptyTableAtTime(startTime,endTime);
    }

    @Override
    public List<Table> findEmptyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findEmptyTableAtTime(paging,startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findEmptyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findEmptyTableAtTime(startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public Table findTableByID(String tableID) {
        return readTablePort.findTableByID(tableID);
    }

    @Override
    public List<Table> findBusyTableAtTime(long startTime, long endTime) {
        return readTablePort.findBusyTableAtTime(startTime,endTime);
    }

    @Override
    public List<Table> findBusyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findBusyTableAtTime(paging,startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findBusyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findBusyTableAtTime(startTime,endTime,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findAllTableByOrderID(String orderID) {
        return readTablePort.findAllTableByOrderID(orderID);
    }

    @Override
    public List<Table> findAllTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findAllTableByOrderID(paging,orderID,sortType,sortValue,searchType,searchValue);
    }

    @Override
    public List<Table> findAllTableByOrderID(String orderID,String sortType, String sortValue, String searchType, String searchValue) {
        return readTablePort.findAllTableByOrderID(orderID,sortType,sortValue,searchType,searchValue);
    }

        @Override
        public List<Table> findAllTableByGroupID(String groupID) {
            return readTablePort.findAllTableByGroupID(groupID);
        }

    @Override
    public List<Table> findAllBusyTable() {
        return readTablePort.findAllBusyTable();
    }

    @Override
    public List<Table> findAllEmptyTable() {
        return readTablePort.findAllEmptyTable();
    }

    @Override
    public List<Table> findTableNotInGroup() {
       return readTablePort.findTableNotInGroup();    }
}
