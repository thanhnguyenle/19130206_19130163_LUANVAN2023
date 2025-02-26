package fitnlu.ntpos.paymentservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListReceiptInventoryOutput {
    private List<ReceiptInventoryOutput> receiptInventoryOutputs;
    private int currentPage;
    private int totalPage;
    private int totalItem;

}
