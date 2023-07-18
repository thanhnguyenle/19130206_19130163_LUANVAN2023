package fitnlu.ntpos.paymentservice.adapter.input;

import fitnlu.ntpos.paymentservice.adapter.input.adapter.ChangeReceiptOrderEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.adapter.FindReceiptOrderEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ListReceiptOrderOutput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderInput;
import fitnlu.ntpos.paymentservice.adapter.input.dto.ReceiptOrderOutput;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaySlipOrderController {
    private final ChangeReceiptOrderEndpointAdapter changeReceiptOrderEndpointAdapter;
    private final FindReceiptOrderEndpointAdapter findReceiptOrderEndpointAdapter;
    //Mutation
    @MutationMapping("createReceiptOrder")
    public ReceiptOrderOutput addReceipt(@Argument ReceiptOrderInput receiptOrderInput) {
        return changeReceiptOrderEndpointAdapter.addReceipt(receiptOrderInput);
    }
    @MutationMapping("updateReceiptOrder")
    public ReceiptOrderOutput updateReceiptOrder(@Argument String id ,@Argument ReceiptOrderInput receiptOrderInput) {
        return changeReceiptOrderEndpointAdapter.updateReceipt(id,receiptOrderInput);
    }
    @MutationMapping("deleteReceiptOrder")
    public ReceiptOrderOutput deleteReceiptOrder(@Argument String id) {
        return changeReceiptOrderEndpointAdapter.removeReceipt(id);
    }
    //Query
    @QueryMapping("receiptOrders")
    public ListReceiptOrderOutput receiptOrders(){
        return findReceiptOrderEndpointAdapter.findReceipts();
    }
    @QueryMapping("receiptOrder")
    public ReceiptOrderOutput receiptOrder(@Argument String id){
        ListReceiptOrderOutput list = findReceiptOrderEndpointAdapter.filterReceipts(null, null,"id",id,null,null);
        if(list.getReceiptOrderOutputs()!=null&&list.getReceiptOrderOutputs().size()>0){
            return list.getReceiptOrderOutputs().get(0);
        }else {
            return ReceiptOrderOutput.builder().build();
        }
    }
    @QueryMapping("filterReceiptOrders")
    public ListReceiptOrderOutput filterReceiptOrders(@Argument PagingInput pagingInput, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue){
        return findReceiptOrderEndpointAdapter.filterReceipts(pagingInput, timeSearch, searchType, searchValue, sortType, sortValue);
    }
}
