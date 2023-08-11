package fitnlu.ntpos.orderservice.adapter.gRPCInput;

import com.google.common.util.concurrent.ListenableFuture;
import fitnlu.ntpos.grpcproto.UserRequest;
import fitnlu.ntpos.grpcproto.UserResponse;
import fitnlu.ntpos.grpcproto.UserServiceGrpc;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class UserGrpcClientService{
    @GrpcClient("user-service")
    private UserServiceGrpc.UserServiceBlockingStub userBlockingStub;

//    public UserResponse checkUserExisted(String userID) {
//        boolean await = false;
//       UserResponse user = null;
//        try {
//            final CountDownLatch countDownLatch = new CountDownLatch(1);
//            System.out.println("Sending request to user-service");
//            user = userBlockingStub.getUser(UserRequest.newBuilder().setUserID(userID).build());
//            System.out.println("Sending request to user-service 2");
//            System.out.println(user.getHaveUser()+" - "+user.getVerified());
//            await =  countDownLatch.await(1, TimeUnit.NANOSECONDS);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//            System.out.println("Error: "+e.getMessage());
//            throw new RuntimeException(e);
//        }
//        return  await?user:UserResponse.newBuilder().build();
//    }
public UserResponse checkUserExisted(String userID) {
    System.out.println("Sending request to user-service");
    UserResponse user = userBlockingStub.getUser(UserRequest.newBuilder().setUserID(userID).build());
    System.out.println("Received response from user-service");
    System.out.println(user.getHaveUser() + " - " + user.getVerified());
    return user;
}

}
