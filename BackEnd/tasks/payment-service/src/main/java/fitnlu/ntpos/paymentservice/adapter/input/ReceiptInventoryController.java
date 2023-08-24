package fitnlu.ntpos.paymentservice.adapter.input;

import fitnlu.ntpos.paymentservice.adapter.input.adapter.ChangeReceiptInventoryEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.adapter.FindReceiptInventoryEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.dto.*;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReceiptInventoryController {
    private final ChangeReceiptInventoryEndpointAdapter changeReceiptInventoryEndpointAdapter;
    private final FindReceiptInventoryEndpointAdapter findReceiptInventoryEndpointAdapter;
    //Mutation
    @MutationMapping("createReceiptInventory")
    public ReceiptInventoryOutput addReceipt(@Argument ReceiptInventoryInput receiptInventoryInput) {
        return changeReceiptInventoryEndpointAdapter.addReceipt(receiptInventoryInput);
    }
    @MutationMapping("updateReceiptInventory")
    public ReceiptInventoryOutput updateReceiptOrder(@Argument String id ,@Argument ReceiptInventoryInput receiptInventoryInput) {
        return changeReceiptInventoryEndpointAdapter.updateReceipt(id,receiptInventoryInput);
    }
    @MutationMapping("deleteReceiptInventory")
    public ReceiptInventoryOutput deleteReceiptOrder(@Argument String id) {
        return changeReceiptInventoryEndpointAdapter.removeReceipt(id);
    }
    //Query
    @QueryMapping("receiptInventories")
    public ListReceiptInventoryOutput receiptOrders(){
        return findReceiptInventoryEndpointAdapter.findReceipts();
    }
    @QueryMapping("receiptInventory")
    public ReceiptInventoryOutput receiptOrder(@Argument String id){
        ListReceiptInventoryOutput list = findReceiptInventoryEndpointAdapter.filterReceipts(null, null,"id",id,null,null);
        if(list.getReceiptInventoryOutputs()!=null&&list.getReceiptInventoryOutputs().size()>0){
            return list.getReceiptInventoryOutputs().get(0);
        }else {
            return ReceiptInventoryOutput.builder().build();
        }
    }
    @QueryMapping("filterReceiptInventories")
    public ListReceiptInventoryOutput filterReceiptOrders(@Argument PagingInput pagingInput, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue){
        return findReceiptInventoryEndpointAdapter.filterReceipts(pagingInput, timeSearch, searchType, searchValue, sortType, sortValue);
    }
}
