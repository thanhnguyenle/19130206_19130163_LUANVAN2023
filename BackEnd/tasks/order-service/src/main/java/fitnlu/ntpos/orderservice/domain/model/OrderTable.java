package fitnlu.ntpos.orderservice.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderTable {
    private String id;
    private String name;
    private int numberOfPeople;
    private String status;
    private String note;
    private String startTime;
    private String endTime;

}
