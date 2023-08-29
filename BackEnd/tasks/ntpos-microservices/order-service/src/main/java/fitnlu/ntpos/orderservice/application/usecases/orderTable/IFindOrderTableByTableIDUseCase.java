package fitnlu.ntpos.orderservice.application.usecases.orderTable;

import fitnlu.ntpos.orderservice.application.ports.input.IFindOrderTableEndpointPort;
import fitnlu.ntpos.orderservice.domain.model.OrderTable;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindOrderTableByTableIDUseCase {
    List<OrderTable> findOrderTableByTableID(String tableID);
    List<OrderTable> findOrderTableByTableID(String tableID, String sortType, String sortValue, String searchType, String searchValue);
    List<OrderTable> findOrderTableByTableID(IPaging paging, String tableID, String sortType, String sortValue, String searchType, String searchValue);
}
