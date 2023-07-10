package fitnlu.ntpos.orderservice.adapter.input.dto;

import java.util.List;

public record OrderTableInput(
        String tableID,
        String note,
        String status,
        long startTime,
         long endTime
) {
}
