package fitnlu.ntpos.orderservice.application.usecases;

import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public interface IFindEmptyTableAtTimeUseCase {
    List<Table> findEmptyTableAtTime(String startTime, String endTime);
}
