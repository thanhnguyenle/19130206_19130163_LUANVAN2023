package fitnlu.ntpos.paymentservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListReceiptOrderOutput {
    private List<ReceiptInventoryOutput> receiptInventoryOutputs;
    private int currentPage;
    private int totalPage;
    private int totalItem;

}
