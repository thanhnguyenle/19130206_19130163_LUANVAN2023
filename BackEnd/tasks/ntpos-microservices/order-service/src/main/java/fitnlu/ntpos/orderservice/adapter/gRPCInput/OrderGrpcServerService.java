package fitnlu.ntpos.orderservice.adapter.gRPCInput;

import fitnlu.ntpos.grpcproto.OrderRequest;
import fitnlu.ntpos.grpcproto.OrderResponse;
import fitnlu.ntpos.grpcproto.OrderServiceGrpc;
import fitnlu.ntpos.orderservice.application.usecases.orderLineItem.IFindAllOrderLineItemByOrderIDUseCase;
import fitnlu.ntpos.orderservice.domain.model.OrderProduct;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;

import java.util.List;

@GrpcService
@RequiredArgsConstructor
@Slf4j
public class OrderGrpcServerService extends OrderServiceGrpc.OrderServiceImplBase{
    private final IFindAllOrderLineItemByOrderIDUseCase findAllOrderLineItemByOrderIDUseCase;
    @Override
    public StreamObserver<OrderRequest> getPercentOrder(StreamObserver<OrderResponse> responseObserver) {
        return new StreamObserver<>() {
            @Override
            public void onNext(OrderRequest value) {
                log.info("Received request from order-service");
                List<OrderProduct> orderProducts = findAllOrderLineItemByOrderIDUseCase.findAllOrderLineItemByProductID(value.getProductID(), value.getTimestamp());
                double totalByProductID = orderProducts.stream().mapToDouble(OrderProduct::getQuantity).sum();
                double total = findAllOrderLineItemByOrderIDUseCase.numberOfOrderProductComplete(value.getTimestamp());
                double cost = orderProducts.stream().mapToDouble(value1 -> value1.getPrice()*value1.getQuantity() - value1.getDiscount()*value1.getPrice()*value1.getQuantity()).sum();
                OrderResponse orderResponse = OrderResponse.newBuilder()
                        .setPercentOrder((int) (((totalByProductID * 1.0d) / (total * 1.0d)) * 10000) / 100.0)
                        .setProductID(value.getProductID())
                        .setCostOrder(cost)
                        .build();
                responseObserver.onNext(orderResponse);
            }

            @Override
            public void onError(Throwable t) {
                log.error("Error: " + t.getMessage());
                responseObserver.onError(t);
            }

            @Override
            public void onCompleted() {
                log.info("Completed");
                responseObserver.onCompleted();
            }
        };
    }
}
