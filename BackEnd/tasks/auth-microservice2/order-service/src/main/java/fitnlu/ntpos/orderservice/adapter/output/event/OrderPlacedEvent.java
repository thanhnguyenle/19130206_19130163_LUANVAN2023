package fitnlu.ntpos.orderservice.adapter.output.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderPlacedEvent {
    private String userID;
    private String orderID;
    private String status;
}
