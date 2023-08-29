package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderReturnMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.output.event.Notification;
import fitnlu.ntpos.orderservice.application.ports.input.IChangeReturnOrderEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.ICreateOrderReturnUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.IDeleteOrderReturnUseCase;
import fitnlu.ntpos.orderservice.application.usecases.orderReturn.IUpdateOrderReturnUseCase;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.List;

@RequiredArgsConstructor
@Adapter
public class ChangeReturnOrderEndpointAdapter implements IChangeReturnOrderEndpointPort {
    private final ICreateOrderReturnUseCase createOrderReturnUseCase;
    private final IDeleteOrderReturnUseCase deleteOrderReturnUseCase;
    private final IUpdateOrderReturnUseCase updateOrderReturnUseCase;
    private final KafkaTemplate<String, Notification> kafkaTemplate ;
    @Override
    public OrderReturnOutput createOrderReturn(OrderReturnInput orderReturnInput) {
        OrderReturnOutput orderOutput = OrderReturnMapperInput.toDTO(createOrderReturnUseCase.createOrderReturn( OrderReturnMapperInput.toDomain(orderReturnInput)));
        if(orderReturnInput.orderLineItemsReturn()!= null) {
            addOrderLineItemToReturnOrder(orderOutput.getId(), orderReturnInput.orderLineItemsReturn());
        }
        if(orderReturnInput.tablesReturn()!= null) {
            addTableToReturnOrder(orderOutput.getId(), orderReturnInput.tablesReturn());
        }
        kafkaTemplate.send(orderReturnInput.userID(), Notification.builder()
                .description("CREATE ORDER")
                .userID(orderReturnInput.userID())
                .status(orderReturnInput.status())
                .timestamp(String.valueOf(System.currentTimeMillis()/1000))
                .build());
        return orderOutput;
    }

    @Override
    public OrderReturnOutput deleteOrderReturn(String id) {
        return OrderReturnMapperInput.toDTO(deleteOrderReturnUseCase.deleteOrderReturn(id));
    }

    @Override
    public OrderReturnOutput updateOrderReturn(String id, OrderReturnInput orderReturnInput) {
        OrderReturnOutput orderOutput = OrderReturnMapperInput.toDTO(createOrderReturnUseCase.createOrderReturn( OrderReturnMapperInput.toDomain(orderReturnInput)));
        if(orderReturnInput.orderLineItemsReturn()!= null) {
            deleteAllOrderItemFromReturnOrder(id);
            addOrderLineItemToReturnOrder(id, orderReturnInput.orderLineItemsReturn());
        }
        if(orderReturnInput.tablesReturn()!= null) {
            deleteAllTableFromReturnOrder(id);
           addTableToReturnOrder(id, orderReturnInput.tablesReturn());
        }
        return orderOutput;
    }

    @Override
    public ResultOutput addOrderLineItemToReturnOrder(String orderID, List<OrderLineItemInput> orderLineItemInputs) {
        return ResultOutput.builder()
                .success(updateOrderReturnUseCase.addOrderLineItemToReturnOrder(orderID, orderLineItemInputs.stream().map(OrderLineItemMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput addTableToReturnOrder(String orderID, List<OrderTableInput> orderTableInputs) {
        return ResultOutput.builder()
                .success(updateOrderReturnUseCase.addTableToReturnOrder(orderID, orderTableInputs.stream().map(OrderTableMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput deleteAllOrderItemFromReturnOrder(String orderItemID) {
        return ResultOutput.builder()
                .success(updateOrderReturnUseCase.deleteAllOrderItemFromReturnOrder(orderItemID))
                .build();
    }

    @Override
    public ResultOutput deleteAllTableFromReturnOrder(String tableID) {
        return ResultOutput.builder()
                .success(updateOrderReturnUseCase.deleteAllTableFromReturnOrder(tableID))
                .build();
    }
}
