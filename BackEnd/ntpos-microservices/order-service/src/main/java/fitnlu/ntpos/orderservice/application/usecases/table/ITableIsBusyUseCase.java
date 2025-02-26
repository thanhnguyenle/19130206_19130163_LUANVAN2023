package fitnlu.ntpos.orderservice.application.usecases.table;

public interface ITableIsBusyUseCase {
    boolean isBusyTable(String id, long startTime, long endTime);
}
