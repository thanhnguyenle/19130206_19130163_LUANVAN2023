package fitnlu.ntpos.orderservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder

public class OrderTableOutput {
    private String id;
    private String name;
    private int numberOfPeople;
    private String status;
    private String note;
    @Setter
    private List<GroupOutput> groups;
}
