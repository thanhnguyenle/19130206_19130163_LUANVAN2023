package fitnlu.ntpos.orderservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListTableOutput {
    private List<OrderOutput> orders;
    private int currentPage;
    private int totalPage;
    private int totalItem;
}
