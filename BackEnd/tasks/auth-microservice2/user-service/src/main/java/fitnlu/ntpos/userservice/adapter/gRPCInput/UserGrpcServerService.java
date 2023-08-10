package fitnlu.ntpos.userservice.adapter.gRPCInput;

import fitnlu.ntpos.grpcproto.UserRequest;
import fitnlu.ntpos.grpcproto.UserResponse;
import fitnlu.ntpos.grpcproto.UserServiceGrpc;
import fitnlu.ntpos.userservice.application.usecases.user.IFindUserUseCase;
import fitnlu.ntpos.userservice.domain.model.User;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@RequiredArgsConstructor
@Slf4j
public class UserGrpcServerService extends UserServiceGrpc.UserServiceImplBase{
    private final IFindUserUseCase iFindUserUseCase;
    @Override
    public void getUser(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        log.info("Received request from client: " + request.getUserID());
        try {
            User user = iFindUserUseCase.findByIdSync(request.getUserID());
            UserResponse userResponse = null;
            if (user != null) {
                userResponse = UserResponse.newBuilder()
                        .setHaveUser(true)
                        .setVerified(iFindUserUseCase.isVerify(request.getUserID()))
                        .build();
            } else {
                userResponse = UserResponse.newBuilder()
                        .setHaveUser(false)
                        .setVerified(false)
                        .build();
            }

            responseObserver.onNext(userResponse);
            responseObserver.onCompleted();
        } catch (Exception error) {
            Status status = Status.NOT_FOUND.withDescription(error.getMessage()).withCause(error);
            log.error("Error: " + error.getMessage());
            responseObserver.onError(status.asException());
        }
    }
}
