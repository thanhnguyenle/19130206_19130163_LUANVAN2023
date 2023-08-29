package fitnlu.ntpos.orderservice.adapter.input.dto;

import fitnlu.ntpos.orderservice.domain.model.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
public class GroupOutput {
    private String id;
    private String name;
    private String status;
    private String note;
    @Setter
    private List<TableOutput> tables;
}
