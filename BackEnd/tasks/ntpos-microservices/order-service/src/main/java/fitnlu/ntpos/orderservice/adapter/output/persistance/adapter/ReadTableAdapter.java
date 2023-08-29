package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.TableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.ITableDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IReadTablePort;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadTableAdapter implements IReadTablePort {
    private final ITableDBIRepository tableDBIRepository;

    @Override
    public List<Table> findAllTable() {
        return tableDBIRepository.findAllTable().stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findAllTable(paging,sortType,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findAllTable(String sortType, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findAllTable(sortType,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findEmptyTableAtTime(long startTime, long endTime) {
        return tableDBIRepository.findEmptyTableAtTime(startTime,endTime).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findEmptyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findEmptyTableAtTime(paging,startTime,endTime,sortType,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findEmptyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findEmptyTableAtTime(startTime,endTime,sortType,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findBusyTableAtTime(long startTime, long endTime) {
        return tableDBIRepository.findBusyTableAtTime(startTime,endTime).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findBusyTableAtTime(IPaging paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findBusyTableAtTime(paging,startTime,endTime,sortType,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findBusyTableAtTime(long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findBusyTableAtTime(startTime,endTime,sortType,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public Table findTableByID(String tableID) {
        return TableMapperOutput.toDomain(tableDBIRepository.findTableByID(tableID));
    }

    @Override
    public List<Table> findAllTableByOrderID(String orderID) {
        return tableDBIRepository.findAllTableByOrderID(orderID).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findAllTableByOrderID(IPaging paging, String orderID, String sortType, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findAllTableByOrderID(paging,orderID,sortType,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findAllTableByOrderID(String startTime, String orderID, String sortValue, String searchType, String searchValue) {
        return tableDBIRepository.findAllTableByOrderID(startTime,orderID,sortValue,searchType,searchValue).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findAllTableByGroupID(String groupID) {
        return tableDBIRepository.findTableByGroupID(groupID).stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findAllBusyTable() {
        return tableDBIRepository.findAllBusyTable().stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findAllEmptyTable() {
        return tableDBIRepository.findAllEmptyTable().stream().map(TableMapperOutput::toDomain).toList();
    }

    @Override
    public List<Table> findTableNotInGroup() {
        return tableDBIRepository.findTableNotInGroup().stream().map(TableMapperOutput::toDomain).toList();
    }
}
