//package fitnlu.ntpos.orderservice.adapter.output.event;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.io.UnsupportedEncodingException;
//import java.nio.ByteBuffer;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//public class OrderPlacedEvent {
//    private String userID;
//    private String orderID;
//    private String status;
//
//    public byte[] getBytesData() throws UnsupportedEncodingException {
//       EventData[] eventDatas = new EventData[]{
//               getEvenData(userID),
//               getEvenData(orderID),
//               getEvenData(status)
//       };
//      int totalSize = getTotalSize(eventDatas);
//        ByteBuffer buffer = ByteBuffer.allocate(totalSize);
//        for(EventData eventData: eventDatas){
//            buffer.putInt(eventData.getDataSize());
//            buffer.put(eventData.dataSerialize);
//        }
//        return buffer.array();
//    }
//    private EventData getEvenData(String data) throws UnsupportedEncodingException {
//        if (data != null) {
//            byte[] serialize = data.getBytes("UTF-8");
//            return EventData.builder()
//                    .dataSerialize(serialize)
//                    .dataSize(serialize.length)
//                    .build();
//        } else {
//            return EventData.builder()
//                    .dataSerialize(new byte[0])
//                    .dataSize(0)
//                    .build();
//        }
//    }
//
//    private int getTotalSize(EventData[] eventDatas) throws UnsupportedEncodingException {
//        int total = 0;
//        int num=1;
//        for(EventData eventData: eventDatas){
//            total +=eventData.dataSize;
//            num++;
//        }
//        return total+num*4;
//    }
//}
