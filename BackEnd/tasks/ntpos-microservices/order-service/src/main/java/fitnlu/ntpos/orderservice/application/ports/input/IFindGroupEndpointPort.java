package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.GroupOutput;

import java.util.List;

public interface IFindGroupEndpointPort {
    GroupOutput findGroupTable(String groupTableID);

    List<GroupOutput> findAllGroupTable();
    List<GroupOutput> findAllGroupTableByTimeStamp(long startTime, long endTime);
    List<GroupOutput> findAllGroupTableByTableID(String tableID);

}
