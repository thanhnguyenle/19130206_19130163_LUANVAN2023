package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.grpcproto.UserResponse;
import fitnlu.ntpos.orderservice.adapter.gRPCInput.UserGrpcClientService;
import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.output.event.OrderPlacedEvent;
import fitnlu.ntpos.orderservice.application.ports.input.IChangeOrderEndpointPort;
import fitnlu.ntpos.orderservice.application.usecases.order.*;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IDeleteAllOrderLineItemsFromOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.table.IDeleteAllTableFromOrderUseCase;
import fitnlu.ntpos.orderservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.List;

@RequiredArgsConstructor
@Adapter
public class ChangeOrderEndpointAdapter implements IChangeOrderEndpointPort {
    private final ICreateOrderUseCase createOrderUseCase;
    private final IDeleteOrderUseCase deleteOrderUseCase;
    private final IUpdateOrderUseCase updateOrderUseCase;
    private final IAddOrderLineItemToOrderUseCase addOrderLineItemToOrderUseCase;
    private final IAddTableToOrderUseCase addTableToOrderUseCase;
    private final IDeleteOrderLineItemFromOrderUseCase deleteOrderLineItemFromOrderUseCase;
    private final IDeleteTableFromOrderUseCase deleteTableFromOrderUseCase;
    private final IDeleteAllTableFromOrderUseCase deleteAllTableFromOrderUseCase;
    private final IDeleteAllOrderLineItemsFromOrderUseCase deleteAllOrderLineItemsFromOrderUseCase;
    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;
    private final UserGrpcClientService userGrpcClientService;
    @Override
    public OrderOutput createOrder(OrderInput orderInput) {
        System.out.println("start create order: 1");
        UserResponse userResponse = userGrpcClientService.checkUserExisted(orderInput.userID());
        System.out.println("start create order: 2");
        if(userResponse.getHaveUser()&& userResponse.getVerified()){
            OrderOutput orderOutput = OrderMapperInput.toDTO(createOrderUseCase.createOrder(OrderMapperInput.toDomain(orderInput)));
            kafkaTemplate.send("orderTopic", OrderPlacedEvent.builder()
                    .orderID(orderOutput.getId())
                    .userID(orderOutput.getUserID())
                    .status(orderOutput.getStatus())
                    .build());
            System.out.println("start create order: 3");
            return orderOutput;
        }
       else throw new RuntimeException("User not found or not verified");

    }

    @Override
    public OrderOutput deleteOrder(String orderID) {
        return OrderMapperInput.toDTO(deleteOrderUseCase.deleteOrder(orderID));
    }

    @Override
    public OrderOutput updateOrder(String orderID, OrderInput orderInput) {
        OrderOutput orderOutput = OrderMapperInput.toDTO(updateOrderUseCase.updateOrder(orderID, OrderMapperInput.toDomain(orderInput)));
        if(orderInput.orderLineItems()!= null) {
            deleteAllOrderLineItemsFromOrderUseCase.deleteAllOrderLineItemsFromOrder(orderID);
            addOrderLineItemFromOrder(orderID, orderInput.orderLineItems());
        }
        if(orderInput.tables()!= null) {
            deleteAllTableFromOrderUseCase.deleteAllTableFromOrder(orderID);
            addTableToOrder(orderID, orderInput.tables());
        }
        return orderOutput;
    }

    @Override
    public ResultOutput addOrderLineItemFromOrder(String orderID, List<OrderLineItemInput> orderProducts) {
        return ResultOutput.builder()
                .success(addOrderLineItemToOrderUseCase.addOrderLineItemFromOrder(orderID, orderProducts.stream().map(OrderLineItemMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput addTableToOrder(String orderID, List<OrderTableInput> orderTables) {
        return ResultOutput.builder()
                .success(addTableToOrderUseCase.addTableToOrder(orderID, orderTables.stream().map(OrderTableMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput deleteOrderLineItemFromOrder(String orderID, List<String> orderLineItemIDs) {
        return ResultOutput.builder()
                .success(deleteOrderLineItemFromOrderUseCase.deleteOrderLineItemFromOrder(orderID, orderLineItemIDs))
                .build();
    }

    @Override
    public ResultOutput deleteTableToOrder(String orderID, List<String> tableIDs) {
            return ResultOutput.builder()
                    .success(deleteTableFromOrderUseCase.deleteTableToOrder(orderID, tableIDs))
                    .build();
    }
}
