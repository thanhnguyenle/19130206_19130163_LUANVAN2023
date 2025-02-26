package fitnlu.ntpos.paymentservice.adapter.input;

import fitnlu.ntpos.paymentservice.adapter.input.adapter.ChangePaySlipOrderEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.adapter.ChangeReceiptOrderEndpointAdapter;
import fitnlu.ntpos.paymentservice.adapter.input.adapter.FindPaySlipOrderEndpointAdapter;
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
public class PaySlipOrderController {
    private final ChangePaySlipOrderEndpointAdapter changePaySlipOrderEndpointAdapter;
    private final FindPaySlipOrderEndpointAdapter findPaySlipOrderEndpointAdapter;
    //Mutation
    @MutationMapping("createPaySlipOrder")
    public PaySlipOrderOutput addReceipt(@Argument PaySlipOrderInput paySlipOrderInput) {
        return changePaySlipOrderEndpointAdapter.addPaySlip(paySlipOrderInput);
    }
    @MutationMapping("updatePaySlipOrder")
    public PaySlipOrderOutput updateReceiptOrder(@Argument String id ,@Argument PaySlipOrderInput paySlipOrderInput) {
        return changePaySlipOrderEndpointAdapter.updatePaySlip(id,paySlipOrderInput);
    }
    @MutationMapping("deletePaySlipOrder")
    public PaySlipOrderOutput deleteReceiptOrder(@Argument String id) {
        return changePaySlipOrderEndpointAdapter.removePaySlip(id);
    }
    //Query
    @QueryMapping("paySlipOrders")
    public ListPaySlipOrderOutput receiptOrders(){
        return findPaySlipOrderEndpointAdapter.findAllPaySlip();
    }
    @QueryMapping("paySlipOrder")
    public PaySlipOrderOutput receiptOrder(@Argument String id){
        ListPaySlipOrderOutput list = findPaySlipOrderEndpointAdapter.filterAllPaySlip(null, null,"id",id,null,null);
        if(list.getPaySlipOrderOutputs()!=null&&list.getPaySlipOrderOutputs().size()>0){
            return list.getPaySlipOrderOutputs().get(0);
        }else {
            return PaySlipOrderOutput.builder().build();
        }
    }
    @QueryMapping("filterPaySlipOrders")
    public ListPaySlipOrderOutput filterReceiptOrders(@Argument PagingInput pagingInput, @Argument TimeSearch timeSearch, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue){
        return findPaySlipOrderEndpointAdapter.filterAllPaySlip(pagingInput, timeSearch, searchType, searchValue, sortType, sortValue);
    }
}
