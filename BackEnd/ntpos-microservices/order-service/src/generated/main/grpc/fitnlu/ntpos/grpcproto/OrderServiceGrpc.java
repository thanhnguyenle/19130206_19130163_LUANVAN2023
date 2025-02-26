package fitnlu.ntpos.grpcproto;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.42.1)",
    comments = "Source: schema.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class OrderServiceGrpc {

  private OrderServiceGrpc() {}

  public static final String SERVICE_NAME = "fitnlu.ntpos.grpcproto.OrderService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<fitnlu.ntpos.grpcproto.OrderRequest,
      fitnlu.ntpos.grpcproto.OrderResponse> getGetPercentOrderMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "getPercentOrder",
      requestType = fitnlu.ntpos.grpcproto.OrderRequest.class,
      responseType = fitnlu.ntpos.grpcproto.OrderResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
  public static io.grpc.MethodDescriptor<fitnlu.ntpos.grpcproto.OrderRequest,
      fitnlu.ntpos.grpcproto.OrderResponse> getGetPercentOrderMethod() {
    io.grpc.MethodDescriptor<fitnlu.ntpos.grpcproto.OrderRequest, fitnlu.ntpos.grpcproto.OrderResponse> getGetPercentOrderMethod;
    if ((getGetPercentOrderMethod = OrderServiceGrpc.getGetPercentOrderMethod) == null) {
      synchronized (OrderServiceGrpc.class) {
        if ((getGetPercentOrderMethod = OrderServiceGrpc.getGetPercentOrderMethod) == null) {
          OrderServiceGrpc.getGetPercentOrderMethod = getGetPercentOrderMethod =
              io.grpc.MethodDescriptor.<fitnlu.ntpos.grpcproto.OrderRequest, fitnlu.ntpos.grpcproto.OrderResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.BIDI_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "getPercentOrder"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  fitnlu.ntpos.grpcproto.OrderRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  fitnlu.ntpos.grpcproto.OrderResponse.getDefaultInstance()))
              .setSchemaDescriptor(new OrderServiceMethodDescriptorSupplier("getPercentOrder"))
              .build();
        }
      }
    }
    return getGetPercentOrderMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static OrderServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<OrderServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<OrderServiceStub>() {
        @java.lang.Override
        public OrderServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new OrderServiceStub(channel, callOptions);
        }
      };
    return OrderServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static OrderServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<OrderServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<OrderServiceBlockingStub>() {
        @java.lang.Override
        public OrderServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new OrderServiceBlockingStub(channel, callOptions);
        }
      };
    return OrderServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static OrderServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<OrderServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<OrderServiceFutureStub>() {
        @java.lang.Override
        public OrderServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new OrderServiceFutureStub(channel, callOptions);
        }
      };
    return OrderServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class OrderServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.OrderRequest> getPercentOrder(
        io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.OrderResponse> responseObserver) {
      return io.grpc.stub.ServerCalls.asyncUnimplementedStreamingCall(getGetPercentOrderMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getGetPercentOrderMethod(),
            io.grpc.stub.ServerCalls.asyncBidiStreamingCall(
              new MethodHandlers<
                fitnlu.ntpos.grpcproto.OrderRequest,
                fitnlu.ntpos.grpcproto.OrderResponse>(
                  this, METHODID_GET_PERCENT_ORDER)))
          .build();
    }
  }

  /**
   */
  public static final class OrderServiceStub extends io.grpc.stub.AbstractAsyncStub<OrderServiceStub> {
    private OrderServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected OrderServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new OrderServiceStub(channel, callOptions);
    }

    /**
     */
    public io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.OrderRequest> getPercentOrder(
        io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.OrderResponse> responseObserver) {
      return io.grpc.stub.ClientCalls.asyncBidiStreamingCall(
          getChannel().newCall(getGetPercentOrderMethod(), getCallOptions()), responseObserver);
    }
  }

  /**
   */
  public static final class OrderServiceBlockingStub extends io.grpc.stub.AbstractBlockingStub<OrderServiceBlockingStub> {
    private OrderServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected OrderServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new OrderServiceBlockingStub(channel, callOptions);
    }
  }

  /**
   */
  public static final class OrderServiceFutureStub extends io.grpc.stub.AbstractFutureStub<OrderServiceFutureStub> {
    private OrderServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected OrderServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new OrderServiceFutureStub(channel, callOptions);
    }
  }

  private static final int METHODID_GET_PERCENT_ORDER = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final OrderServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(OrderServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_GET_PERCENT_ORDER:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.getPercentOrder(
              (io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.OrderResponse>) responseObserver);
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class OrderServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    OrderServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return fitnlu.ntpos.grpcproto.Schema.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("OrderService");
    }
  }

  private static final class OrderServiceFileDescriptorSupplier
      extends OrderServiceBaseDescriptorSupplier {
    OrderServiceFileDescriptorSupplier() {}
  }

  private static final class OrderServiceMethodDescriptorSupplier
      extends OrderServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    OrderServiceMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (OrderServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new OrderServiceFileDescriptorSupplier())
              .addMethod(getGetPercentOrderMethod())
              .build();
        }
      }
    }
    return result;
  }
}
