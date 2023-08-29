package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindOrderTableEndpointPort {
     ListOrderTablesOutput findAllOrderTableByOrderID(String orderID) ;

    ListOrderTablesOutput findAllOrderTableByOrderID(PagingInput pagingInput, String orderID, String sortType, String sortValue, String searchType, String searchValue);

    OrderTableOutput findOrderTableByID(String orderID, String tableID) ;
    ListOrderTablesOutput findAllOrderTable() ;
    ListOrderTablesOutput findOrderTableByTableID(String tableID);
}

