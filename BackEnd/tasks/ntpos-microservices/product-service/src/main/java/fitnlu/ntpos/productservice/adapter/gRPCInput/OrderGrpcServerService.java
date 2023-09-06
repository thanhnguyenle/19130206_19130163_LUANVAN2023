package fitnlu.ntpos.productservice.adapter.gRPCInput;

import fitnlu.ntpos.grpcproto.*;
import fitnlu.ntpos.productservice.adapter.input.dto.OrderProductOutput;
import fitnlu.ntpos.productservice.application.usecases.product.IFindProductUseCase;
import fitnlu.ntpos.productservice.domain.model.Product;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderGrpcServerService {
    @GrpcClient("order-service")
    private OrderServiceGrpc.OrderServiceStub orderServiceStub;
    private final IFindProductUseCase iFindProductUseCase;

    public List<OrderProductOutput> getProductOrderPercent(List<OrderRequest> requests) {
        try {
            List<OrderProductOutput> orderProductOutputs = new ArrayList<>();
            final CountDownLatch countDownLatch = new CountDownLatch(1);
            StreamObserver<OrderRequest> responseObserver = orderServiceStub.getPercentOrder(new StreamObserver<>() {

                @Override
                public void onNext(OrderResponse value) {
                    System.out.println("Received response from order-service");
                    Product product = iFindProductUseCase.findProductById(value.getProductID());
                    orderProductOutputs.add(OrderProductOutput.builder()
                            .id(value.getProductID())
                            .price(product.getPrice())
                            .name(product.getName())
                            .quantity(product.getQuantity())
                            .description(product.getDescription())
                            .unit(product.getUnit())
                            .status(product.getStatus())
                            .createdAt(product.getCreatedAt())
                            .percent(value.getPercentOrder())
                            .cost(value.getCostOrder())
                            .build());
                }

                @Override
                public void onError(Throwable t) {
                    System.out.println("Error: " + t.getMessage());
                    countDownLatch.countDown();
                }

                @Override
                public void onCompleted() {
                    System.out.println("Completed");
                    countDownLatch.countDown();
                }
            });
            requests.forEach(responseObserver::onNext);
            responseObserver.onCompleted();
//            System.out.println(ProductGrpcClientService.checkError);
            boolean await = countDownLatch.await(1, TimeUnit.MINUTES);
            return await ? orderProductOutputs : null;
        }catch (Exception e){
            System.out.println("Error: "+e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
