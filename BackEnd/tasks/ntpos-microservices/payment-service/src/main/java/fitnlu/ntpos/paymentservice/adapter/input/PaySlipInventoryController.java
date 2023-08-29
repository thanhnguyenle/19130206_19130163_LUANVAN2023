package fitnlu.ntpos.paymentservice.adapter.input;

import fitnlu.ntpos.paymentservice.adapter.input.adapter.ChangePaySlipInventoryEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.adapter.ChangeReceiptOrderEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.adapter.FindPaySlipInventoryEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.adapter.FindReceiptOrderEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.dto.*;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaySlipInventoryController {
    private final ChangePaySlipInventoryEndpointAdapter changeReceiptOrderEndpointAdapter;
    private final FindPaySlipInventoryEndpointAdapter findReceiptOrderEndpointAdapter;
    //Mutation
    @MutationMapping("createPaySlipInventory")
    public PaySlipInventoryOutput addReceipt(@Argument PaySlipInventoryInput paySlipInventoryInput) {
        return changeReceiptOrderEndpointAdapter.addPaySlip(paySlipInventoryInput);
    }
    @MutationMapping("updatePaySlipInventory")
    public PaySlipInventoryOutput updateReceiptOrder(@Argument String id ,@Argument PaySlipInventoryInput paySlipInventoryInput) {
        return changeReceiptOrderEndpointAdapter.updatePaySlip(id,paySlipInventoryInput);
    }
    @MutationMapping("deletePaySlipInventory")
    public PaySlipInventoryOutput deleteReceiptOrder(@Argument String id) {
        return changeReceiptOrderEndpointAdapter.removePaySlip(id);
    }
    //Query
    @QueryMapping("paySlipInventories")
    public ListPaySlipInventoryOutput receiptOrders(){
        return findReceiptOrderEndpointAdapter.findAllPaySlip();
    }
    @QueryMapping("paySlipInventory")
    public PaySlipInventoryOutput receiptOrder(@Argument String id){
        ListPaySlipInventoryOutput list = findReceiptOrderEndpointAdapter.filterAllPaySlip(null, null,"id",id,null,null);
        if(list.getPaySlipInventoryOutputs()!=null&&list.getPaySlipInventoryOutputs().size()>0){
            return list.getPaySlipInventoryOutputs().get(0);
        }else {
            return PaySlipInventoryOutput.builder().build();
        }
    }
    @QueryMapping("filterPaySlipInventories")
    public ListPaySlipInventoryOutput filterReceiptOrders(@Argument PagingInput pagingInput, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue){
        return findReceiptOrderEndpointAdapter.filterAllPaySlip(pagingInput, timeSearch, searchType, searchValue, sortType, sortValue);
    }
}
