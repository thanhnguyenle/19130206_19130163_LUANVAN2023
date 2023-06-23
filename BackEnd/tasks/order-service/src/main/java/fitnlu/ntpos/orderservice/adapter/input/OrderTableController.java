package fitnlu.ntpos.orderservice.adapter.input;

import fitnlu.ntpos.orderservice.adapter.input.adapter.FindOrderTableEndpointAdapter;
import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderTableController {
    private final FindOrderTableEndpointAdapter findOrderTableEndpointAdapter;

    //Query
    @QueryMapping("orderTables")
    public ListOrderTablesOutput orderTables() {
        return findOrderTableEndpointAdapter.findAllOrderTable();
    }
    @QueryMapping("orderTable")
    public OrderTableOutput orderTable(@Argument String orderID, @Argument String tableID) {
        return findOrderTableEndpointAdapter.findOrderTableByID(orderID,tableID);
    }
    @QueryMapping("findOrderTableByOrderID")
    public ListOrderTablesOutput findOrderTableByOrderID(@Argument String orderID) {
        return findOrderTableEndpointAdapter.findAllOrderTableByOrderID(orderID);
    }
    @QueryMapping("findOrderTableByTableID")
    public ListOrderTablesOutput findOrderTableByTableID(@Argument String tableID) {
        return findOrderTableEndpointAdapter.findOrderTableByTableID(tableID);
    }


}
