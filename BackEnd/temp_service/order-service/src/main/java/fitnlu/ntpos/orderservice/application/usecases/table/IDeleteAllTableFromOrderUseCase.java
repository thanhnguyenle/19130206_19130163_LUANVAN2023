package fitnlu.ntpos.orderservice.application.usecases.table;

import java.util.List;

public interface IDeleteAllTableFromOrderUseCase {
    boolean deleteAllTableFromOrder(String orderID);
}
