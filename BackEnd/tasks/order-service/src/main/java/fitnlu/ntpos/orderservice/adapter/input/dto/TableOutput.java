package fitnlu.ntpos.orderservice.adapter.input.dto;

import fitnlu.ntpos.orderservice.domain.model.GroupTable;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder

public class TableOutput {
    private String id;
    private String name;
    private int numberOfPeople;
    private String status;
    private String note;
    @Setter
    private List<GroupOutput> groups;
}
