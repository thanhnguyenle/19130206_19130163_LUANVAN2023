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
    ListTableOutput findEmptyTableAtTime(String startTime, String endTime) ;
    ListTableOutput findEmptyTableAtTime(PagingInput paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
    ListTableOutput findBusyTableAtTime(String startTime, String endTime) ;
    ListTableOutput findBusyTableAtTime(PagingInput paging, String startTime, String endTime, String sortType, String sortValue, String searchType, String searchValue);
   TableOutput findTableByID(String tableID) ;
    ListTableOutput findAllTableByOrderID(String orderID);
    ListTableOutput findAllTableByOrderID(PagingInput paging, String orderID, String sortType, String sortValue, String searchType, String searchValue);
}
