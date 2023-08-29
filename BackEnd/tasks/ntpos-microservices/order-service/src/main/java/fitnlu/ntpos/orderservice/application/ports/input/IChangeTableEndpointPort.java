package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.domain.model.Table;

public interface IChangeTableEndpointPort {
    TableOutput createTable(TableInput tableInput);
    TableOutput deleteTable(String id);
    TableOutput updateTable(String id, TableInput tableInput);
    ResultOutput deleteAllTableFromGroup(String groupID);
    ResultOutput deleteAllTableFromOrder(String orderID);
}
