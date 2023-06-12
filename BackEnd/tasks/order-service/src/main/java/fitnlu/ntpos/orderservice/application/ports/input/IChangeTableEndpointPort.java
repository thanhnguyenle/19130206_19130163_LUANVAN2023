package fitnlu.ntpos.orderservice.application.ports.input;

import fitnlu.ntpos.orderservice.adapter.input.dto.TableInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.domain.model.Table;

public interface IChangeTableEndpointPort {
    TableOutput createTable(TableInput tableInput);
    TableOutput deleteTable(String id);
    TableOutput updateTable(TableInput tableInput);
}
