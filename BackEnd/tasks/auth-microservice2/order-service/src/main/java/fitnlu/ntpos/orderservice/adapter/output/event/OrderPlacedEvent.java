package fitnlu.ntpos.orderservice.adapter.output.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.UnsupportedEncodingException;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderPlacedEvent {
    private String userID;
    private String orderID;
    private String status;

    public EventData getUserSerialize() throws UnsupportedEncodingException {
        if (userID != null) {
            byte[] serialize = userID.getBytes("UTF-8");
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

    public EventData getOrderIDSerialize() throws UnsupportedEncodingException {
        if (orderID != null) {
            byte[] serialize = orderID.getBytes("UTF-8");
            return EventData.builder()
                    .dataSerialize(orderID.getBytes("UTF-8"))
                    .dataSize(serialize.length)
                    .build();
        } else {
            return EventData.builder()
                    .dataSerialize(new byte[0])
                    .dataSize(0)
                    .build();
        }
    }
    public EventData getStatusSerialize() throws UnsupportedEncodingException {
        if (status != null) {
            byte[] serialize =status.getBytes("UTF-8");
            return EventData.builder()
                    .dataSerialize(status.getBytes("UTF-8"))
                    .dataSize(serialize.length)
                    .build();
        } else {
            return EventData.builder()
                    .dataSerialize(new byte[0])
                    .dataSize(0)
                    .build();
        }
    }

    public int getTotalSize() throws UnsupportedEncodingException {
        EventData userIDEventData = getUserSerialize();
        EventData orderIDEventData = getOrderIDSerialize();
        EventData statusIDEventData = getStatusSerialize();
        EventData[] eventDatas = new EventData[]{userIDEventData, orderIDEventData, statusIDEventData};
        int total = 0;
        int num=1;
        for(EventData eventData: eventDatas){
            total +=eventData.dataSize;
            num++;
        }
        return total+num*4;
    }
}
