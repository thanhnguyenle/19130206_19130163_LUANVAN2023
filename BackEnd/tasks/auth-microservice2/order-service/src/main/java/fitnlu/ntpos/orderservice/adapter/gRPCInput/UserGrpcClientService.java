package fitnlu.ntpos.orderservice.adapter.gRPCInput;

import fitnlu.ntpos.grpcproto.UserRequest;
import fitnlu.ntpos.grpcproto.UserResponse;
import fitnlu.ntpos.grpcproto.UserServiceGrpc;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Service
public class UserGrpcClientService{
    @GrpcClient("user-service")
    private UserServiceGrpc.UserServiceBlockingStub userBlockingStub;

    public UserResponse checkUserExisted(String userID) {
        boolean await = false;
        UserResponse userResponse = null;
        try {
            final CountDownLatch countDownLatch = new CountDownLatch(1);
            System.out.println("Sending request to user-service");
            userResponse = userBlockingStub.getUser(UserRequest.newBuilder().setUserID(userID).build());
            System.out.println("Sending request to user-service 2");
            await =  countDownLatch.await(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            System.out.println("Error: "+e.getMessage());
            throw new RuntimeException(e);
        }
        return  await?userResponse:UserResponse.newBuilder().build();
    }


}
