package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.ListTableOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindTableEndpointPort {
    ListTableOutput findAllTable() ;
    ListTableOutput findAllTable(PagingInput paging, String sortType, String sortValue, String searchType, String searchValue);
    ListTableOutput findEmptyTableAtTime(long startTime, long endTime) ;
    ListTableOutput findEmptyTableAtTime(PagingInput paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
    ListTableOutput findBusyTableAtTime(long startTime, long endTime) ;
    ListTableOutput findBusyTableAtTime(PagingInput paging, long startTime, long endTime, String sortType, String sortValue, String searchType, String searchValue);
   TableOutput findTableByID(String tableID) ;
    ListTableOutput findAllTableByOrderID(String orderID);
    ListTableOutput findAllTableByGroupID(String groupID);
    ListTableOutput findAllTableByOrderID(PagingInput paging, String orderID, String sortType, String sortValue, String searchType, String searchValue);
}
