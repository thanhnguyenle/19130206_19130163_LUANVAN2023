package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public interface IReadGroupTablePort {
    GroupTable findGroupTable(String groupTableID);

    List<GroupTable> findAllGroupTable();

    List<GroupTable> findAllGroupTableByTableID(String tableID);

}
