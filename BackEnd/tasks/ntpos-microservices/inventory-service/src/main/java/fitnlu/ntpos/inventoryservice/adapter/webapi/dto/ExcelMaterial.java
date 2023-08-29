package fitnlu.ntpos.inventoryservice.adapter.webapi.dto;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class ExcelMaterial {
    private String id;
    private String userID;
    private String group;
    private long orderDate;
    private String status;
    private String note;
}
