package fitnlu.ntpos.orderservice.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Table {
    private String id;
    private String name;
    private int numberOfPeople;
    private String status;
    private String note;
    private boolean isBusy;
    private List<GroupTable> groups;
}
