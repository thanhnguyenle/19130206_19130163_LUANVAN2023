package fitnlu.ntpos.orderservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder

public class OrderTableOutput {
    private String orderID;
    private String tableID;
    private String status;
    private String note;
    private long startTime;
    private long endTime;
    private String name;
}
