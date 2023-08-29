package fitnlu.ntpos.orderservice.application.usecases.order;

import java.util.List;

public interface IDeleteTableFromOrderUseCase {
    boolean deleteTableToOrder(String orderID, List<String> tableIDs);
}
