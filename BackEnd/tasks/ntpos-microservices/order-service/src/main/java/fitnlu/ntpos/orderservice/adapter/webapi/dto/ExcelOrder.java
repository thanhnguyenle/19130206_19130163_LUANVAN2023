package fitnlu.ntpos.orderservice.adapter.webapi.dto;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class ExcelOrder {
    private String id;
    private String userID;
    private String group;
    private long orderDate;
    private String status;
    private String note;
}
