package fitnlu.ntpos.productservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class ListOrderProductOutput {
    private List<OrderProductOutput> orderProductOutputs;
    @Setter
    private int currentPage;
    @Setter
    private int totalPage;

    private int totalItem;
}
