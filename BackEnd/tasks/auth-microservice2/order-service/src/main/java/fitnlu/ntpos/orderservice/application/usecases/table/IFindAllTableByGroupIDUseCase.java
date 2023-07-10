package fitnlu.ntpos.orderservice.application.usecases.table;

import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllTableByGroupIDUseCase {
    List<Table> findAllTableByGroupID(String groupID);
}
