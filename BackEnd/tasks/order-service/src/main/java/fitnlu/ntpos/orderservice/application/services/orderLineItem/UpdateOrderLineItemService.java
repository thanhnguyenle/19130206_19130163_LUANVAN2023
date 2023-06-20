package fitnlu.ntpos.orderservice.application.services.orderLineItem;

import fitnlu.ntpos.orderservice.application.ports.output.IWriteOrderLineItemPort;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IUpdateOrderLineItemUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateOrderLineItemService implements IUpdateOrderLineItemUseCase {
    private final IWriteOrderLineItemPort writeOrderLineItemPort;
    @Override
    public OrderProduct updateOrderLineItem(String orderID,String productID, OrderProduct orderLineItem) {
        return writeOrderLineItemPort.updateOrderLineItem(orderID, productID,orderLineItem);
    }
}
