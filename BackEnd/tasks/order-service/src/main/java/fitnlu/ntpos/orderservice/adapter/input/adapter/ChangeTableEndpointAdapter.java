package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.TableInput;
import fitnlu.ntpos.orderservice.adapter.input.dto.TableOutput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.TableMapperInput;
import fitnlu.ntpos.orderservice.application.ports.input.IChangeTableEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.table.ICreateTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteTableUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IUpdateTableUseCase;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class ChangeTableEndpointAdapter implements IChangeTableEndpointPort {
    private final ICreateTableUseCase createTableUseCase;
    private final IDeleteTableUseCase deleteTableUseCase;
    private final IUpdateTableUseCase updateTableUseCase;
    @Override
    public TableOutput createTable(TableInput tableInput) {
        return TableMapperInput.toDTO(createTableUseCase.createTable(TableMapperInput.toDomain(tableInput)));
    }

    @Override
    public TableOutput deleteTable(String id) {
        return TableMapperInput.toDTO(deleteTableUseCase.deleteTable(id));
    }

    @Override
    public TableOutput updateTable(TableInput tableInput) {
        return TableMapperInput.toDTO(updateTableUseCase.updateTable(TableMapperInput.toDomain(tableInput)));
    }


}
