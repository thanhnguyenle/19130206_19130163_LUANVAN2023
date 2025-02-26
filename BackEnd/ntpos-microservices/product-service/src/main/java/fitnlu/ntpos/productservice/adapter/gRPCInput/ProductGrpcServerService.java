package fitnlu.ntpos.productservice.adapter.gRPCInput;

import fitnlu.ntpos.grpcproto.*;
import fitnlu.ntpos.productservice.application.usecases.product.IFindProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IUpdateProductUseCase;
import fitnlu.ntpos.productservice.domain.model.Product;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@RequiredArgsConstructor
@Slf4j
public class ProductGrpcServerService extends ProductServiceGrpc.ProductServiceImplBase{
    private final IFindProductUseCase iFindProductUseCase;
    private final IUpdateProductUseCase updateProductUseCase;

    @Override
    public StreamObserver<ProductRequest> updateQuantity(StreamObserver<ProductResponse> responseObserver) {
        return new StreamObserver<>() {
            boolean result = false;

            @Override
            public void onNext(ProductRequest productRequest) {
                Product product = iFindProductUseCase.findProductById(productRequest.getProductID());

                if (product.getQuantity() < productRequest.getQuantity()) {
                    log.error("Not enough quantity");
                    result = false;
                } else {
                    product.setQuantity(product.getQuantity() - productRequest.getQuantity());
                    updateProductUseCase.updateProduct(product.getId(), product);
                    result = true;
                }
            }

            @Override
            public void onError(Throwable throwable) {
                log.error("Error: " + throwable.getMessage());
                responseObserver.onError(Status.INTERNAL.withDescription(throwable.getMessage()).asRuntimeException());
            }

            @Override
            public void onCompleted() {
                ProductResponse productResponse = ProductResponse.newBuilder()
                        .setIsSuccess(result)
                        .build();
                responseObserver.onNext(productResponse);
                responseObserver.onCompleted();
            }
        };
    }
}
