package fitnlu.ntpos.orderservice.application.usecases.orderTable;

import fitnlu.ntpos.orderservice.domain.model.OrderTable;

import java.util.List;

public interface IFindAllOrderTableUseCase {
    List<OrderTable> findAllOrderTable();
}
