// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: schema.proto

package fitnlu.ntpos.grpcproto;

/**
 * Protobuf enum {@code fitnlu.ntpos.grpcproto.TimeSearch}
 */
public enum TimeSearch
    implements com.google.protobuf.ProtocolMessageEnum {
  /**
   * <code>TODAY = 0;</code>
   */
  TODAY(0),
  /**
   * <code>YESTERDAY = 1;</code>
   */
  YESTERDAY(1),
  /**
   * <code>THIS_WEEK = 2;</code>
   */
  THIS_WEEK(2),
  /**
   * <code>LAST_WEEK = 3;</code>
   */
  LAST_WEEK(3),
  /**
   * <code>THIS_MONTH = 4;</code>
   */
  THIS_MONTH(4),
  /**
   * <code>LAST_MONTH = 5;</code>
   */
  LAST_MONTH(5),
  /**
   * <code>THIS_YEAR = 6;</code>
   */
  THIS_YEAR(6),
  /**
   * <code>LAST_YEAR = 7;</code>
   */
  LAST_YEAR(7),
  /**
   * <code>ALL_TIME = 8;</code>
   */
  ALL_TIME(8),
  UNRECOGNIZED(-1),
  ;

  /**
   * <code>TODAY = 0;</code>
   */
  public static final int TODAY_VALUE = 0;
  /**
   * <code>YESTERDAY = 1;</code>
   */
  public static final int YESTERDAY_VALUE = 1;
  /**
   * <code>THIS_WEEK = 2;</code>
   */
  public static final int THIS_WEEK_VALUE = 2;
  /**
   * <code>LAST_WEEK = 3;</code>
   */
  public static final int LAST_WEEK_VALUE = 3;
  /**
   * <code>THIS_MONTH = 4;</code>
   */
  public static final int THIS_MONTH_VALUE = 4;
  /**
   * <code>LAST_MONTH = 5;</code>
   */
  public static final int LAST_MONTH_VALUE = 5;
  /**
   * <code>THIS_YEAR = 6;</code>
   */
  public static final int THIS_YEAR_VALUE = 6;
  /**
   * <code>LAST_YEAR = 7;</code>
   */
  public static final int LAST_YEAR_VALUE = 7;
  /**
   * <code>ALL_TIME = 8;</code>
   */
  public static final int ALL_TIME_VALUE = 8;


  public final int getNumber() {
    if (this == UNRECOGNIZED) {
      throw new java.lang.IllegalArgumentException(
          "Can't get the number of an unknown enum value.");
    }
    return value;
  }

  /**
   * @param value The numeric wire value of the corresponding enum entry.
   * @return The enum associated with the given numeric wire value.
   * @deprecated Use {@link #forNumber(int)} instead.
   */
  @java.lang.Deprecated
  public static TimeSearch valueOf(int value) {
    return forNumber(value);
  }

  /**
   * @param value The numeric wire value of the corresponding enum entry.
   * @return The enum associated with the given numeric wire value.
   */
  public static TimeSearch forNumber(int value) {
    switch (value) {
      case 0: return TODAY;
      case 1: return YESTERDAY;
      case 2: return THIS_WEEK;
      case 3: return LAST_WEEK;
      case 4: return THIS_MONTH;
      case 5: return LAST_MONTH;
      case 6: return THIS_YEAR;
      case 7: return LAST_YEAR;
      case 8: return ALL_TIME;
      default: return null;
    }
  }

  public static com.google.protobuf.Internal.EnumLiteMap<TimeSearch>
      internalGetValueMap() {
    return internalValueMap;
  }
  private static final com.google.protobuf.Internal.EnumLiteMap<
      TimeSearch> internalValueMap =
        new com.google.protobuf.Internal.EnumLiteMap<TimeSearch>() {
          public TimeSearch findValueByNumber(int number) {
            return TimeSearch.forNumber(number);
          }
        };

  public final com.google.protobuf.Descriptors.EnumValueDescriptor
      getValueDescriptor() {
    if (this == UNRECOGNIZED) {
      throw new java.lang.IllegalStateException(
          "Can't get the descriptor of an unrecognized enum value.");
    }
    return getDescriptor().getValues().get(ordinal());
  }
  public final com.google.protobuf.Descriptors.EnumDescriptor
      getDescriptorForType() {
    return getDescriptor();
  }
  public static final com.google.protobuf.Descriptors.EnumDescriptor
      getDescriptor() {
    return fitnlu.ntpos.grpcproto.Schema.getDescriptor().getEnumTypes().get(0);
  }

  private static final TimeSearch[] VALUES = values();

  public static TimeSearch valueOf(
      com.google.protobuf.Descriptors.EnumValueDescriptor desc) {
    if (desc.getType() != getDescriptor()) {
      throw new java.lang.IllegalArgumentException(
        "EnumValueDescriptor is not for this type.");
    }
    if (desc.getIndex() == -1) {
      return UNRECOGNIZED;
    }
    return VALUES[desc.getIndex()];
  }

  private final int value;

  private TimeSearch(int value) {
    this.value = value;
  }

  // @@protoc_insertion_point(enum_scope:fitnlu.ntpos.grpcproto.TimeSearch)
}

