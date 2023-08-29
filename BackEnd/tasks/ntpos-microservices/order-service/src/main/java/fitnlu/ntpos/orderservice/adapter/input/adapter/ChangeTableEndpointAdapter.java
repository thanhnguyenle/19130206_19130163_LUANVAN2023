package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.TableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IChangeTableEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IAddTableToGroupUseCase;
import fitnlu.ntpos.orderservice.application.usecases.groupTable.IDeleteAllGroupByTableIDUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IDeleteAllOrderLineItemsFromOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.*;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.Collections;

@Adapter
@RequiredArgsConstructor
public class ChangeTableEndpointAdapter implements IChangeTableEndpointPort {
    private final ICreateTableUseCase createTableUseCase;
    private final IDeleteTableUseCase deleteTableUseCase;
    private final IUpdateTableUseCase updateTableUseCase;
    private final IAddTableToGroupUseCase addTableToGroupUseCase;
    private final IDeleteAllGroupByTableIDUseCase deleteAllGroupByTableIDUseCase;
    private final IDeleteAllTableByGroupIDUseCase deleteAllTableByGroupIDUseCase;
    private final IDeleteAllTableFromOrderUseCase deleteAllOrderLineItemsFromOrderUseCase;
    private final IUpdateStatusTable updateStatusTable;
    @Override
    public TableOutput createTable(TableInput tableInput) {
        TableOutput tableOutput = TableMapperInput.toDTO(createTableUseCase.createTable(TableMapperInput.toDomain(tableInput)));
        if(tableInput.groups() != null) {
            tableInput.groups().forEach(groupID -> addTableToGroupUseCase.addTableToGroup(groupID, Collections.singletonList(tableOutput.getId())));
        }
        return tableOutput;
    }

    @Override
    public TableOutput deleteTable(String id) {
        return TableMapperInput.toDTO(deleteTableUseCase.deleteTable(id));
    }

    @Override
    public TableOutput updateTable(String id, TableInput tableInput) {
        TableOutput tableOutput = TableMapperInput.toDTO(updateTableUseCase.updateTable(id,TableMapperInput.toDomain(tableInput)));
        if(tableInput.groups() != null) {
            deleteAllGroupByTableIDUseCase.deleteAllGroupByTableID(id);
            tableInput.groups().forEach(groupID -> addTableToGroupUseCase.addTableToGroup(groupID, Collections.singletonList(id)));
        }
        return tableOutput;
    }

    @Override
    public ResultOutput deleteAllTableFromGroup(String groupID) {
        return ResultOutput.builder().success(deleteAllTableByGroupIDUseCase.deleteAllTableByGroupID(groupID)).build();
    }

    @Override
    public ResultOutput deleteAllTableFromOrder(String orderID) {
        return ResultOutput.builder().success(deleteAllOrderLineItemsFromOrderUseCase.deleteAllTableFromOrder(orderID)).build();
    }

    @Override
    public ResultOutput updateTableStatus(String id, String status) {
        return ResultOutput.builder().success(updateStatusTable.updateStatusTable(id, status)).build();
    }


}
