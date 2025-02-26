package fitnlu.ntpos.grpcproto;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.42.1)",
    comments = "Source: schema.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class ProductServiceGrpc {

  private ProductServiceGrpc() {}

  public static final String SERVICE_NAME = "fitnlu.ntpos.grpcproto.ProductService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<fitnlu.ntpos.grpcproto.ProductRequest,
      fitnlu.ntpos.grpcproto.ProductResponse> getUpdateQuantityMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "updateQuantity",
      requestType = fitnlu.ntpos.grpcproto.ProductRequest.class,
      responseType = fitnlu.ntpos.grpcproto.ProductResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.CLIENT_STREAMING)
  public static io.grpc.MethodDescriptor<fitnlu.ntpos.grpcproto.ProductRequest,
      fitnlu.ntpos.grpcproto.ProductResponse> getUpdateQuantityMethod() {
    io.grpc.MethodDescriptor<fitnlu.ntpos.grpcproto.ProductRequest, fitnlu.ntpos.grpcproto.ProductResponse> getUpdateQuantityMethod;
    if ((getUpdateQuantityMethod = ProductServiceGrpc.getUpdateQuantityMethod) == null) {
      synchronized (ProductServiceGrpc.class) {
        if ((getUpdateQuantityMethod = ProductServiceGrpc.getUpdateQuantityMethod) == null) {
          ProductServiceGrpc.getUpdateQuantityMethod = getUpdateQuantityMethod =
              io.grpc.MethodDescriptor.<fitnlu.ntpos.grpcproto.ProductRequest, fitnlu.ntpos.grpcproto.ProductResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.CLIENT_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "updateQuantity"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  fitnlu.ntpos.grpcproto.ProductRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  fitnlu.ntpos.grpcproto.ProductResponse.getDefaultInstance()))
              .setSchemaDescriptor(new ProductServiceMethodDescriptorSupplier("updateQuantity"))
              .build();
        }
      }
    }
    return getUpdateQuantityMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static ProductServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ProductServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ProductServiceStub>() {
        @java.lang.Override
        public ProductServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ProductServiceStub(channel, callOptions);
        }
      };
    return ProductServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static ProductServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ProductServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ProductServiceBlockingStub>() {
        @java.lang.Override
        public ProductServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ProductServiceBlockingStub(channel, callOptions);
        }
      };
    return ProductServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static ProductServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<ProductServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<ProductServiceFutureStub>() {
        @java.lang.Override
        public ProductServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new ProductServiceFutureStub(channel, callOptions);
        }
      };
    return ProductServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class ProductServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.ProductRequest> updateQuantity(
        io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.ProductResponse> responseObserver) {
      return io.grpc.stub.ServerCalls.asyncUnimplementedStreamingCall(getUpdateQuantityMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getUpdateQuantityMethod(),
            io.grpc.stub.ServerCalls.asyncClientStreamingCall(
              new MethodHandlers<
                fitnlu.ntpos.grpcproto.ProductRequest,
                fitnlu.ntpos.grpcproto.ProductResponse>(
                  this, METHODID_UPDATE_QUANTITY)))
          .build();
    }
  }

  /**
   */
  public static final class ProductServiceStub extends io.grpc.stub.AbstractAsyncStub<ProductServiceStub> {
    private ProductServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProductServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ProductServiceStub(channel, callOptions);
    }

    /**
     */
    public io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.ProductRequest> updateQuantity(
        io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.ProductResponse> responseObserver) {
      return io.grpc.stub.ClientCalls.asyncClientStreamingCall(
          getChannel().newCall(getUpdateQuantityMethod(), getCallOptions()), responseObserver);
    }
  }

  /**
   */
  public static final class ProductServiceBlockingStub extends io.grpc.stub.AbstractBlockingStub<ProductServiceBlockingStub> {
    private ProductServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProductServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ProductServiceBlockingStub(channel, callOptions);
    }
  }

  /**
   */
  public static final class ProductServiceFutureStub extends io.grpc.stub.AbstractFutureStub<ProductServiceFutureStub> {
    private ProductServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProductServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new ProductServiceFutureStub(channel, callOptions);
    }
  }

  private static final int METHODID_UPDATE_QUANTITY = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final ProductServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(ProductServiceImplBase serviceImpl, int methodId) {
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
        case METHODID_UPDATE_QUANTITY:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.updateQuantity(
              (io.grpc.stub.StreamObserver<fitnlu.ntpos.grpcproto.ProductResponse>) responseObserver);
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class ProductServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    ProductServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return fitnlu.ntpos.grpcproto.Schema.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("ProductService");
    }
  }

  private static final class ProductServiceFileDescriptorSupplier
      extends ProductServiceBaseDescriptorSupplier {
    ProductServiceFileDescriptorSupplier() {}
  }

  private static final class ProductServiceMethodDescriptorSupplier
      extends ProductServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    ProductServiceMethodDescriptorSupplier(String methodName) {
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
      synchronized (ProductServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new ProductServiceFileDescriptorSupplier())
              .addMethod(getUpdateQuantityMethod())
              .build();
        }
      }
    }
    return result;
  }
}
