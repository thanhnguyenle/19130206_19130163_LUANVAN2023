package fitnlu.ntpos.orderservice.adapter.output.persistance.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupTableEntities {
    private String id;
    private String name;
    private String status;
    private String note;
    private List<TableEntities> tables;
}
