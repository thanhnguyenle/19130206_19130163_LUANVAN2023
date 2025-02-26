package fitnlu.ntpos.orderservice.adapter.input.adapter;

import fitnlu.ntpos.grpcproto.ProductRequest;
import fitnlu.ntpos.grpcproto.UserResponse;
import fitnlu.ntpos.orderservice.adapter.gRPCInput.ProductGrpcClientService;
import fitnlu.ntpos.orderservice.adapter.gRPCInput.UserGrpcClientService;
import fitnlu.ntpos.orderservice.adapter.input.dto.*;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderLineItemMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderMapperInput;
import fitnlu.ntpos.orderservice.adapter.input.mapper.OrderTableMapperInput;
import fitnlu.ntpos.orderservice.adapter.output.event.Notification;
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
    private final KafkaTemplate<String, Notification> kafkaTemplate;
    private final UserGrpcClientService userGrpcClientService;
    private final ProductGrpcClientService productGrpcClientService;
    @Override
    public OrderOutput createOrder(OrderInput orderInput) {
        System.out.println("start create order: 1"+orderInput.userID());
        UserResponse userResponse = userGrpcClientService.checkUserExisted(orderInput.userID());
        System.out.println(userResponse.getHaveUser()+" - "+userResponse.getVerified());
        System.out.println("start create order: 2");
        if(userResponse.getHaveUser()&& userResponse.getVerified()){
           boolean check =  productGrpcClientService.updateQuantity(orderInput.orderLineItems().stream().map(orderLineItemInput -> ProductRequest.newBuilder()
                    .setProductID(orderLineItemInput.productID())
                    .setQuantity(orderLineItemInput.quantity())
                    .setPrice(orderLineItemInput.price())
                    .build()).toList());
           if(check) {
               OrderOutput orderOutput = OrderMapperInput.toDTO(createOrderUseCase.createOrder(OrderMapperInput.toDomain(orderInput)));
               kafkaTemplate.send(orderInput.userID(), Notification.builder()
                       .description("CREATE ORDER")
                       .userID(orderOutput.getUserID())
                       .status(orderOutput.getStatus())
                       .timestamp(String.valueOf(System.currentTimeMillis() / 1000))
                       .build());
               return orderOutput;
           }else
               throw new RuntimeException("Product not found or not enough quantity");
        }
       else throw new RuntimeException("User not found or not verified");

    }

    @Override
    public OrderOutput deleteOrder(String orderID) {
        return OrderMapperInput.toDTO(deleteOrderUseCase.deleteOrder(orderID));
    }

    @Override
    public OrderOutput updateOrder(String orderID, OrderInput orderInput) {
        System.out.println("Update order 01");
        OrderOutput orderOutput = OrderMapperInput.toDTO(updateOrderUseCase.updateOrder(orderID, OrderMapperInput.toDomain(orderInput)));
        if(orderInput.orderLineItems()!= null) {
            System.out.println("Update order 02");
            boolean check =  productGrpcClientService.updateQuantity(orderInput.orderLineItems().stream().map(orderLineItemInput -> ProductRequest.newBuilder()
                    .setProductID(orderLineItemInput.productID())
                    .setQuantity(orderLineItemInput.quantity())
                    .setPrice(orderLineItemInput.price())
                    .build()).toList());
            if(check) {
                deleteAllOrderLineItemsFromOrderUseCase.deleteAllOrderLineItemsFromOrder(orderID);
                addOrderLineItemFromOrder(orderID, orderInput.orderLineItems());
            }else{
                throw new RuntimeException("Product not found or not enough quantity");
            }
            System.out.println("Update order 03");
        }
        if(orderInput.tables()!= null) {
            System.out.println("Update order 04");
            deleteAllTableFromOrderUseCase.deleteAllTableFromOrder(orderID);
            addTableToOrder(orderID, orderInput.tables());
            System.out.println("Update order 05");
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
