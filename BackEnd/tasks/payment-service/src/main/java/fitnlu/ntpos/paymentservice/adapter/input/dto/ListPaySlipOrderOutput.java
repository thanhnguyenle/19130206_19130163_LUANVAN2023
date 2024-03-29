package fitnlu.ntpos.paymentservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListPaySlipOrderOutput {
    private List<PaySlipOrderOutput> paySlipOrderOutputs;
    private int currentPage;
    private int totalPage;
    private int totalItem;

}
