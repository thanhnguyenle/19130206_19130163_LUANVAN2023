package fitnlu.ntpos.orderservice.adapter.output.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Serializer;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderPlacedEventSerialization implements Serializer<OrderPlacedEvent> {
    private String userID;
    private String orderID;
    private String status;

    @Override
    public byte[] serialize(String topic, OrderPlacedEvent data) {
        try {
            if (data == null)
                return null;
            else {
               EventData userIDEventData = data.getUserSerialize();
               EventData orderIDEventData = data.getOrderIDSerialize();
               EventData statusIDEventData = data.getStatusSerialize();
                return getBufferArray(data,userIDEventData, orderIDEventData, statusIDEventData);
            }
        } catch (Exception e) {
            throw new SerializationException(
                    "Error when serializing OrderPlacedEvent to byte[] " + e);
        }
    }
    private byte[] getBufferArray(OrderPlacedEvent data, EventData... eventDatas) throws UnsupportedEncodingException {
        ByteBuffer buffer = ByteBuffer.allocate(data.getTotalSize());
        for(EventData eventData: eventDatas){
            buffer.putInt(eventData.getDataSize());
            buffer.put(eventData.dataSerialize);
        }
        return buffer.array();
    }
}
