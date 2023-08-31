package fitnlu.ntpos.orderservice.adapter.gRPCInput;

import fitnlu.ntpos.grpcproto.*;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Service
public class ProductGrpcClientService {
    @GrpcClient("product-service")
    private ProductServiceGrpc.ProductServiceStub userBlockingStub;
    private static boolean checkError= false;

    public boolean updateQuantity(List<ProductRequest> requests) {
      try {
          final CountDownLatch countDownLatch = new CountDownLatch(1);
          StreamObserver<ProductRequest> responseObserver = userBlockingStub.updateQuantity(new StreamObserver<ProductResponse>() {
              @Override
              public void onNext(ProductResponse value) {
                  System.out.println("Received response from product-service");
                  ProductGrpcClientService.checkError = value.getIsSuccess();
                  if(!ProductGrpcClientService.checkError){
                      throw new RuntimeException("Update quantity failed");
                  }
              }

              @Override
              public void onError(Throwable t) {
                  System.out.println("Error: " + t.getMessage());
                  ProductGrpcClientService.checkError = false;
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
          System.out.println(ProductGrpcClientService.checkError);
          boolean await = countDownLatch.await(1, TimeUnit.MINUTES);
          return await && ProductGrpcClientService.checkError;
      }catch (Exception e){
          System.out.println("Error: "+e.getMessage());
          throw new RuntimeException(e);
      }

    }
}

