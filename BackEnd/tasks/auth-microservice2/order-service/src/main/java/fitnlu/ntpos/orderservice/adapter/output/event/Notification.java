package fitnlu.ntpos.orderservice.adapter.output.event;

import lombok.*;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Notification {
    private String userID;
    private String description;
    private String status;
    private String timestamp;

    public byte[] getBytesData() throws UnsupportedEncodingException {
       EventData[] eventDatas = new EventData[]{
               getEvenData(userID),
               getEvenData(description),
               getEvenData(status),
               getEvenData(timestamp),
       };
      int totalSize = getTotalSize(eventDatas);
        ByteBuffer buffer = ByteBuffer.allocate(totalSize);
        for(EventData eventData: eventDatas){
            buffer.putInt(eventData.getDataSize());
            buffer.put(eventData.dataSerialize);
        }
        return buffer.array();
    }
    private EventData getEvenData(String data) throws UnsupportedEncodingException {
        if (data != null) {
            byte[] serialize = data.getBytes("UTF-8");
            return EventData.builder()
                    .dataSerialize(serialize)
                    .dataSize(serialize.length)
                    .build();
        } else {
            return EventData.builder()
                    .dataSerialize(new byte[0])
                    .dataSize(0)
                    .build();
        }
    }

    private int getTotalSize(EventData[] eventDatas) throws UnsupportedEncodingException {
        int total = 0;
        int num=0;
        for(EventData eventData: eventDatas){
            total +=eventData.dataSize;
            num++;
        }
        return total+num*4;
    }
}
