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
        return new StreamObserver<ProductRequest>() {
            @Override
            public void onNext(ProductRequest productRequest) {
                Product product = iFindProductUseCase.findProductById(productRequest.getProductID());
                if(product.getQuantity() < productRequest.getQuantity()){
                    log.error("Not enough quantity");
                    ProductResponse productResponse = ProductResponse.newBuilder()
                            .setIsSuccess(false)
                            .build();
                    responseObserver.onNext(productResponse);
                }else {
                    product.setQuantity(product.getQuantity() - productRequest.getQuantity());
                    updateProductUseCase.updateProduct(product.getId(), product);
                    ProductResponse productResponse = ProductResponse.newBuilder()
                            .setIsSuccess(true)
                            .build();
                    responseObserver.onNext(productResponse);
                }
            }

            @Override
            public void onError(Throwable throwable) {
                log.error("Error: "+throwable.getMessage());
                responseObserver.onError(Status.INTERNAL.withDescription(throwable.getMessage()).asRuntimeException());
            }

            @Override
            public void onCompleted() {
                responseObserver.onCompleted();
            }
        };
    }
}
