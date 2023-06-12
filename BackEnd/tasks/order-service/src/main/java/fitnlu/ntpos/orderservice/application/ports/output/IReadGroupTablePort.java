package fitnlu.ntpos.orderservice.application.ports.output;

import fitnlu.ntpos.orderservice.domain.model.Table;

public interface IReadGroupTablePort {
    Table createTable(Table table);
    Table deleteTable(String id);
    Table updateTable(Table table);

}
