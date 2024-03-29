// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: schema.proto

package fitnlu.ntpos.grpcproto;

/**
 * Protobuf type {@code fitnlu.ntpos.grpcproto.OrderResponse}
 */
public final class OrderResponse extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:fitnlu.ntpos.grpcproto.OrderResponse)
    OrderResponseOrBuilder {
private static final long serialVersionUID = 0L;
  // Use OrderResponse.newBuilder() to construct.
  private OrderResponse(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private OrderResponse() {
    productID_ = "";
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new OrderResponse();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private OrderResponse(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    if (extensionRegistry == null) {
      throw new java.lang.NullPointerException();
    }
    com.google.protobuf.UnknownFieldSet.Builder unknownFields =
        com.google.protobuf.UnknownFieldSet.newBuilder();
    try {
      boolean done = false;
      while (!done) {
        int tag = input.readTag();
        switch (tag) {
          case 0:
            done = true;
            break;
          case 9: {

            percentOrder_ = input.readDouble();
            break;
          }
          case 18: {
            java.lang.String s = input.readStringRequireUtf8();

            productID_ = s;
            break;
          }
          default: {
            if (!parseUnknownField(
                input, unknownFields, extensionRegistry, tag)) {
              done = true;
            }
            break;
          }
        }
      }
    } catch (com.google.protobuf.InvalidProtocolBufferException e) {
      throw e.setUnfinishedMessage(this);
    } catch (java.io.IOException e) {
      throw new com.google.protobuf.InvalidProtocolBufferException(
          e).setUnfinishedMessage(this);
    } finally {
      this.unknownFields = unknownFields.build();
      makeExtensionsImmutable();
    }
  }
  public static final com.google.protobuf.Descriptors.Descriptor
      getDescriptor() {
    return fitnlu.ntpos.grpcproto.Schema.internal_static_fitnlu_ntpos_grpcproto_OrderResponse_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return fitnlu.ntpos.grpcproto.Schema.internal_static_fitnlu_ntpos_grpcproto_OrderResponse_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            fitnlu.ntpos.grpcproto.OrderResponse.class, fitnlu.ntpos.grpcproto.OrderResponse.Builder.class);
  }

  public static final int PERCENTORDER_FIELD_NUMBER = 1;
  private double percentOrder_;
  /**
   * <code>double percentOrder = 1;</code>
   * @return The percentOrder.
   */
  @java.lang.Override
  public double getPercentOrder() {
    return percentOrder_;
  }

  public static final int PRODUCTID_FIELD_NUMBER = 2;
  private volatile java.lang.Object productID_;
  /**
   * <code>string productID = 2;</code>
   * @return The productID.
   */
  @java.lang.Override
  public java.lang.String getProductID() {
    java.lang.Object ref = productID_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = 
          (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      productID_ = s;
      return s;
    }
  }
  /**
   * <code>string productID = 2;</code>
   * @return The bytes for productID.
   */
  @java.lang.Override
  public com.google.protobuf.ByteString
      getProductIDBytes() {
    java.lang.Object ref = productID_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = 
          com.google.protobuf.ByteString.copyFromUtf8(
              (java.lang.String) ref);
      productID_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }

  private byte memoizedIsInitialized = -1;
  @java.lang.Override
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1) return true;
    if (isInitialized == 0) return false;

    memoizedIsInitialized = 1;
    return true;
  }

  @java.lang.Override
  public void writeTo(com.google.protobuf.CodedOutputStream output)
                      throws java.io.IOException {
    if (java.lang.Double.doubleToRawLongBits(percentOrder_) != 0) {
      output.writeDouble(1, percentOrder_);
    }
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(productID_)) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 2, productID_);
    }
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (java.lang.Double.doubleToRawLongBits(percentOrder_) != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeDoubleSize(1, percentOrder_);
    }
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(productID_)) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(2, productID_);
    }
    size += unknownFields.getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof fitnlu.ntpos.grpcproto.OrderResponse)) {
      return super.equals(obj);
    }
    fitnlu.ntpos.grpcproto.OrderResponse other = (fitnlu.ntpos.grpcproto.OrderResponse) obj;

    if (java.lang.Double.doubleToLongBits(getPercentOrder())
        != java.lang.Double.doubleToLongBits(
            other.getPercentOrder())) return false;
    if (!getProductID()
        .equals(other.getProductID())) return false;
    if (!unknownFields.equals(other.unknownFields)) return false;
    return true;
  }

  @java.lang.Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptor().hashCode();
    hash = (37 * hash) + PERCENTORDER_FIELD_NUMBER;
    hash = (53 * hash) + com.google.protobuf.Internal.hashLong(
        java.lang.Double.doubleToLongBits(getPercentOrder()));
    hash = (37 * hash) + PRODUCTID_FIELD_NUMBER;
    hash = (53 * hash) + getProductID().hashCode();
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static fitnlu.ntpos.grpcproto.OrderResponse parseFrom(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  @java.lang.Override
  public Builder newBuilderForType() { return newBuilder(); }
  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }
  public static Builder newBuilder(fitnlu.ntpos.grpcproto.OrderResponse prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }
  @java.lang.Override
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE
        ? new Builder() : new Builder().mergeFrom(this);
  }

  @java.lang.Override
  protected Builder newBuilderForType(
      com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }
  /**
   * Protobuf type {@code fitnlu.ntpos.grpcproto.OrderResponse}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:fitnlu.ntpos.grpcproto.OrderResponse)
      fitnlu.ntpos.grpcproto.OrderResponseOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return fitnlu.ntpos.grpcproto.Schema.internal_static_fitnlu_ntpos_grpcproto_OrderResponse_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return fitnlu.ntpos.grpcproto.Schema.internal_static_fitnlu_ntpos_grpcproto_OrderResponse_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              fitnlu.ntpos.grpcproto.OrderResponse.class, fitnlu.ntpos.grpcproto.OrderResponse.Builder.class);
    }

    // Construct using fitnlu.ntpos.grpcproto.OrderResponse.newBuilder()
    private Builder() {
      maybeForceBuilderInitialization();
    }

    private Builder(
        com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
      super(parent);
      maybeForceBuilderInitialization();
    }
    private void maybeForceBuilderInitialization() {
      if (com.google.protobuf.GeneratedMessageV3
              .alwaysUseFieldBuilders) {
      }
    }
    @java.lang.Override
    public Builder clear() {
      super.clear();
      percentOrder_ = 0D;

      productID_ = "";

      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return fitnlu.ntpos.grpcproto.Schema.internal_static_fitnlu_ntpos_grpcproto_OrderResponse_descriptor;
    }

    @java.lang.Override
    public fitnlu.ntpos.grpcproto.OrderResponse getDefaultInstanceForType() {
      return fitnlu.ntpos.grpcproto.OrderResponse.getDefaultInstance();
    }

    @java.lang.Override
    public fitnlu.ntpos.grpcproto.OrderResponse build() {
      fitnlu.ntpos.grpcproto.OrderResponse result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public fitnlu.ntpos.grpcproto.OrderResponse buildPartial() {
      fitnlu.ntpos.grpcproto.OrderResponse result = new fitnlu.ntpos.grpcproto.OrderResponse(this);
      result.percentOrder_ = percentOrder_;
      result.productID_ = productID_;
      onBuilt();
      return result;
    }

    @java.lang.Override
    public Builder clone() {
      return super.clone();
    }
    @java.lang.Override
    public Builder setField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.setField(field, value);
    }
    @java.lang.Override
    public Builder clearField(
        com.google.protobuf.Descriptors.FieldDescriptor field) {
      return super.clearField(field);
    }
    @java.lang.Override
    public Builder clearOneof(
        com.google.protobuf.Descriptors.OneofDescriptor oneof) {
      return super.clearOneof(oneof);
    }
    @java.lang.Override
    public Builder setRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        int index, java.lang.Object value) {
      return super.setRepeatedField(field, index, value);
    }
    @java.lang.Override
    public Builder addRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.addRepeatedField(field, value);
    }
    @java.lang.Override
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof fitnlu.ntpos.grpcproto.OrderResponse) {
        return mergeFrom((fitnlu.ntpos.grpcproto.OrderResponse)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(fitnlu.ntpos.grpcproto.OrderResponse other) {
      if (other == fitnlu.ntpos.grpcproto.OrderResponse.getDefaultInstance()) return this;
      if (other.getPercentOrder() != 0D) {
        setPercentOrder(other.getPercentOrder());
      }
      if (!other.getProductID().isEmpty()) {
        productID_ = other.productID_;
        onChanged();
      }
      this.mergeUnknownFields(other.unknownFields);
      onChanged();
      return this;
    }

    @java.lang.Override
    public final boolean isInitialized() {
      return true;
    }

    @java.lang.Override
    public Builder mergeFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      fitnlu.ntpos.grpcproto.OrderResponse parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (fitnlu.ntpos.grpcproto.OrderResponse) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }

    private double percentOrder_ ;
    /**
     * <code>double percentOrder = 1;</code>
     * @return The percentOrder.
     */
    @java.lang.Override
    public double getPercentOrder() {
      return percentOrder_;
    }
    /**
     * <code>double percentOrder = 1;</code>
     * @param value The percentOrder to set.
     * @return This builder for chaining.
     */
    public Builder setPercentOrder(double value) {
      
      percentOrder_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>double percentOrder = 1;</code>
     * @return This builder for chaining.
     */
    public Builder clearPercentOrder() {
      
      percentOrder_ = 0D;
      onChanged();
      return this;
    }

    private java.lang.Object productID_ = "";
    /**
     * <code>string productID = 2;</code>
     * @return The productID.
     */
    public java.lang.String getProductID() {
      java.lang.Object ref = productID_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs =
            (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        productID_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }
    /**
     * <code>string productID = 2;</code>
     * @return The bytes for productID.
     */
    public com.google.protobuf.ByteString
        getProductIDBytes() {
      java.lang.Object ref = productID_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = 
            com.google.protobuf.ByteString.copyFromUtf8(
                (java.lang.String) ref);
        productID_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    /**
     * <code>string productID = 2;</code>
     * @param value The productID to set.
     * @return This builder for chaining.
     */
    public Builder setProductID(
        java.lang.String value) {
      if (value == null) {
    throw new NullPointerException();
  }
  
      productID_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>string productID = 2;</code>
     * @return This builder for chaining.
     */
    public Builder clearProductID() {
      
      productID_ = getDefaultInstance().getProductID();
      onChanged();
      return this;
    }
    /**
     * <code>string productID = 2;</code>
     * @param value The bytes for productID to set.
     * @return This builder for chaining.
     */
    public Builder setProductIDBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
    throw new NullPointerException();
  }
  checkByteStringIsUtf8(value);
      
      productID_ = value;
      onChanged();
      return this;
    }
    @java.lang.Override
    public final Builder setUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.setUnknownFields(unknownFields);
    }

    @java.lang.Override
    public final Builder mergeUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.mergeUnknownFields(unknownFields);
    }


    // @@protoc_insertion_point(builder_scope:fitnlu.ntpos.grpcproto.OrderResponse)
  }

  // @@protoc_insertion_point(class_scope:fitnlu.ntpos.grpcproto.OrderResponse)
  private static final fitnlu.ntpos.grpcproto.OrderResponse DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new fitnlu.ntpos.grpcproto.OrderResponse();
  }

  public static fitnlu.ntpos.grpcproto.OrderResponse getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<OrderResponse>
      PARSER = new com.google.protobuf.AbstractParser<OrderResponse>() {
    @java.lang.Override
    public OrderResponse parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new OrderResponse(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<OrderResponse> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<OrderResponse> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public fitnlu.ntpos.grpcproto.OrderResponse getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

