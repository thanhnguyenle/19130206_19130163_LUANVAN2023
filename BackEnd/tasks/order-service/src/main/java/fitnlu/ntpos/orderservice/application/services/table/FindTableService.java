package fitnlu.ntpos.orderservice.application.services.table;

import fitnlu.ntpos.orderservice.application.usecases.table.IFindEmptyTableAtTimeUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindAllTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IFindTableByIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public class FindTableService implements IFindTableByIDUseCase, IFindEmptyTableAtTimeUseCase, IFindAllTableUseCase {

    @Override
    public List<Table> findAllTable() {
        return null;
    }

    @Override
    public List<Table> findAllTable(IPaging paging, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public List<Table> findAllTable(String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public List<Table> findEmptyTableAtTime(String startTime, String endTime) {
        return null;
    }

    @Override
    public List<Table> findEmptyTableAtTime(IPaging paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public List<Table> findEmptyTableAtTime(String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue) {
        return null;
    }

    @Override
    public Table findTableByID(String tableID) {
        return null;
    }
}
