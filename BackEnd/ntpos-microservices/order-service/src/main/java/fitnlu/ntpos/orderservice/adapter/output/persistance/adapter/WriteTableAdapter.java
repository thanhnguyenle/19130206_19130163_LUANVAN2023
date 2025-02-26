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
    public Table updateTable(String id, Table table) {
        return TableMapperOutput.toDomain(tableDBIRepository.updateTable(id, TableMapperOutput.toEntities(table)));
    }

    @Override
    public boolean deleteAllTableByGroupID(String groupID) {
        return tableDBIRepository.deleteAllTableByGroupID(groupID);
    }

    @Override
    public boolean deleteAllTableFromOrder(String orderID) {
        return tableDBIRepository.deleteAllTableFromOrder(orderID);
    }

    @Override
    public boolean updateStatusTable(String id, String status) {
        return tableDBIRepository.updateStatusTable( id,  status);
    }
}
