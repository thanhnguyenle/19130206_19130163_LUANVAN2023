package fitnlu.ntpos.orderservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class OrderReturn {
    private String id;
    private String userID;
    private String group;
    private String orderID;
    private long orderReturnDate;
    private List<OrderProduct> orderLineItemsReturn;
    private List<OrderTable> tableReturn;
    private String status;
    private String note;

}
