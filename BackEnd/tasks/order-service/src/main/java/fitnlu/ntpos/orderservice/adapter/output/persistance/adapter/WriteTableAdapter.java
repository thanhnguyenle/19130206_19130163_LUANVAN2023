package fitnlu.ntpos.orderservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.orderservice.adapter.output.persistance.mapper.TableMapperOutput;
import fitnlu.ntpos.orderservice.adapter.output.persistance.repository.ITableDBIRepository;
import fitnlu.ntpos.orderservice.application.ports.output.IWriteTablePort;
import fitnlu.ntpos.orderservice.domain.model.Table;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WriteTableAdapter implements IWriteTablePort {
    private final ITableDBIRepository tableDBIRepository;
    @Override
    public Table createTable(Table table) {
        return TableMapperOutput.toDomain(tableDBIRepository.createTable(TableMapperOutput.toEntities(table)));
    }

    @Override
    public Table deleteTable(String id) {
        return TableMapperOutput.toDomain(tableDBIRepository.deleteTable(id));
    }

    @Override
    public Table updateTable(Table table) {
        return TableMapperOutput.toDomain(tableDBIRepository.updateTable(TableMapperOutput.toEntities(table)));
    }
}
