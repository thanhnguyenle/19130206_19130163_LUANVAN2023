package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public interface IWriteTablePort {
    Table createTable(Table table);
    Table deleteTable(String id);
    Table updateTable(Table table);

}
